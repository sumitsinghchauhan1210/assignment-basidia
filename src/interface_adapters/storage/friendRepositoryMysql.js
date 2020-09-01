const db = require('../../framework_drivers/database/sequelize')
const Op = require('sequelize').Op

module.exports = class {
    constructor() {
        this.db = db
        this.model = this.db.model('friends')
        this.userModel = this.db.model('user')
    }
    async removeFriend(userId, friendId) {
        let result = await this.model.destroy({ where: { userId: userId, friendId: friendId } })
        if (result == 1) return true
        else result = await this.model.destroy({ where: { userId: friendId, friendId: userId } })
        if (result == 1) return true
        return false
    }

    async viewFriends(userId) {
        const friends = await this.model.findAll({
            attributes: ['userId'], where: { friendId: userId }
        })
        const friendsIds = friends.map(val => val.dataValues.userId)
        return await this.userModel.findAll({
            attributes: { exclude: ["password", "createdAt", "updatedAt", "mobileNo", "email"] },
            where: {
                id: {
                    [Op.in]: friendsIds
                }
            }
        })
    }

    async viewMutualFriends(userId, friendId) {
        const friends = await this.model.findAll({
            attributes: ['userId'],
            where: {
                [Op.or]: [
                    { friendId: userId },
                    { friendId: friendId }
                ]
            }
        })
        const friendsIds = friends.map(val => val.dataValues.userId)
        const index1 = friendsIds.indexOf(userId);
        if (index1 > -1) friendsIds.splice(index1, 1)
        const index2 = friendsIds.indexOf(friendId);
        if (index2 > -1) friendsIds.splice(index2, 1)
        console.log('ids', friendsIds)
        return await this.userModel.findAll({
            attributes: { exclude: ["password", "createdAt", "updatedAt", "mobileNo", "email"] },
            where: {
                id: {
                    [Op.in]: friendsIds
                }
            }
        })
    }

    async viewFriendOfFriend(userId, friendId) {
        const friends = await this.model.findAll({
            attributes: ['userId'],
            where: {
                friendId: friendId
            }
        })
        const friendsIds = friends.map(val => val.dataValues.userId)
        const index = friendsIds.indexOf(userId);
        if (index > -1) friendsIds.splice(index, 1)
        return await this.userModel.findAll({
            attributes: { exclude: ["password", "createdAt", "updatedAt", "mobileNo", "email"] },
            where: {
                id: {
                    [Op.in]: friendsIds
                }
            }
        })
    }

}