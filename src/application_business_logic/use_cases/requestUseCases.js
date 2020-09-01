module.exports = class {
    sendRequest(senderId, receiverId, repository) {
        return repository.sendRequest(senderId, receiverId)
    }
    acceptRequest(userId, requestId, repository) {
        return repository.acceptRequest(userId, requestId)
    }
    rejectRequest(userId, requestId, repository) {
        return repository.rejectRequest(userId, requestId)
    }
    viewRequests(userId, repository) {
        return repository.viewRequests(userId)
    }
}