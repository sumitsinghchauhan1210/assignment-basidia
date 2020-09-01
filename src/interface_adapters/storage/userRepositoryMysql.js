const db = require('../../framework_drivers/database/sequelize')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
module.exports = class {
    constructor() {
        this.db = db
        this.model = this.db.model('user')
    }
    encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password, salt)
        return password
    }
    async getAll() {
        return await this.model.findAll({ attributes: { exclude: ["password", "createdAt", "updatedAt"] } })
    }
    async getById(id) {
        return await this.model.findOne({ where: { id } })
    }
    async add(userEntity) {
        const user = await this.model.create(userEntity)
        return await this.model.findOne({ where: { id: user.dataValues.id }, attributes: { exclude: ["password", "createdAt", "updatedAt"] } })
    }
    async update(id, updates, fields) {
        console.log('updating user ', id, updates, fields)
        return await this.model.update(updates, { where: { id }, fields })
    }
    async getUserByMobile(mobileNo) {
        return await this.model.findOne({ where: { mobileNo } })
    }
    async getUserByEmail(email) {
        return await this.model.findOne({ where: { email } })
    }


}