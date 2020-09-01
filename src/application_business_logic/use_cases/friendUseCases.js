module.exports = class {
    removeFriend(userId, friendId, repository) {
        return repository.removeFriend(userId, friendId)
    }
    viewFriends(userId, repository) {
        console.log('in use case')
        return repository.viewFriends(userId)
    }
    viewMutualFriends(userId, friendId, repository) {
        return repository.viewMutualFriends(userId, friendId)
    }
    viewFriendOfFriend(userId, friendId, repository) {
        return repository.viewFriendOfFriend(userId, friendId)
    }
}