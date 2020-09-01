const db = require('../../framework_drivers/database/sequelize')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../../../config.json')
const bcrypt = require('bcryptjs')
module.exports = class {
    constructor() {
        this.db = db
        this.model = this.db.model('user')
    }
    async getUserByMobileNo(mobileNo) {
        return await this.model.findOne({ where: { mobileNo } })
    }
    async getUserByEmail(email) {
        return await this.model.findOne({ where: { email } })
    }
    async signIn(email, password) {
        const user = await this.getUserByEmail(email)
        // console.log('User is ', user.dataValues)
        if (_.isNull(user) || _.isUndefined(user)) throw new Error('user')
        else {
            const isAuthenticated = bcrypt.compareSync(password, user.dataValues.password)
            if (isAuthenticated) {
                return {
                    accessToken: jwt.sign({ id: user.dataValues.id, name: user.dataValues.fullname }, config.JWT_SECRET, { expiresIn: config.JWT_LIFE }),
                    refreshToken: jwt.sign({ id: user.dataValues.id, name: user.dataValues.fullname }, config.REFRESH_JWT_SECRET, { expiresIn: config.REFRESH_JWT_LIFE })
                }
            } else {
                throw new Error('auth')
            }
        }
    }

    async refresh(userId) {
        const user = await this.model.findOne({ where: { id: userId } })
        if (_.isNull(user) || _.isUndefined(user)) throw new Error('user')
        return {
            accessToken: jwt.sign({ id: user.dataValues.id, name: user.dataValues.fullname }, config.JWT_SECRET, { expiresIn: config.JWT_LIFE }),
            refreshToken: jwt.sign({ id: user.dataValues.id, name: user.dataValues.fullname }, config.REFRESH_JWT_SECRET, { expiresIn: config.REFRESH_JWT_LIFE })
        }
    }

    async resetPassword(userId, password) {
        await this.model.update({ password }, { where: { id: userId }, fields: ['password'] })
        return true
    }
}