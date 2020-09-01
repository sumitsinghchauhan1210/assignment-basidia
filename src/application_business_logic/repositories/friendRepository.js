module.exports = class {
    constructor(storageRepository) {
        this.repository = storageRepository
    }
    removeFriend(userId, friendId) {
        return this.repository.removeFriend(userId, friendId)
    }
    viewFriends(userId) {
        console.log('in repository')
        return this.repository.viewFriends(userId)
    }
    viewMutualFriends(userId, friendId) {
        return this.repository.viewMutualFriends(userId, friendId)
    }
    viewFriendOfFriend(userId, friendId) {
        return this.repository.viewFriendOfFriend(userId, friendId)
    }
}