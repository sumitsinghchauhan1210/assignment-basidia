const db = require('../../framework_drivers/database/sequelize')
const _ = require('lodash')
module.exports = class {
    constructor() {
        this.db = db
        this.model = this.db.model('request')
        this.userModel = this.db.model('user')
        this.friendModel = this.db.model('friends')
    }
    async sendRequest(senderId, receiverId) {
        return await this.model.create({ senderId, receiverId })
    }
    async acceptRequest(userId, requestId) {
        const request = await this.model.findOne({ where: { id: requestId } })
        console.log('request is --', request.dataValues.receiverId, userId)
        if (_.isNull(request)) throw new Error('Invalid Request')
        if (!_.isEqual(request.dataValues.receiverId, userId)) throw new Error('Invalid User Request')
        const result = await this.model.update({ status: 'Confirmed' }, { where: { id: requestId }, fields: ['status'] })
        if (result[0] == 1) {
            await this.friendModel.create({ userId: request.dataValues.senderId, friendId: request.dataValues.receiverId })
            return true
        }
        return false
    }
    async rejectRequest(userId, requestId) {
        const request = await this.model.findOne({ where: { id: requestId } })
        if (_.isNull(request)) throw new Error('Invalid Request')
        if (!_.isEqual(request.dataValues.receiverId, userId)) throw new Error('Invalid User Request')
        const result = await this.model.update({ status: 'Cancelled' }, { where: { id: requestId }, fields: ['status'] })
        if (result[0] == 1) return true
        return false
    }
    async viewRequests(userId) {
        return await this.model.findAll({
            attributes: ['senderId', ['id', 'requestId']],
            where: { receiverId: userId, status: 'Pending' },
            include: [{
                attributes: { exclude: ["id", "password", "createdAt", "updatedAt", "email", "mobileNo"] },
                model: this.userModel, as: 'sender'
            }]
        })
    }
}