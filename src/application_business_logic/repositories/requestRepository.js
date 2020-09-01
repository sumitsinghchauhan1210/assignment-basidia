module.exports = class {
    constructor(storageRepository) {
        this.repository = storageRepository
    }
    sendRequest(senderId, receiverId) {
        return this.repository.sendRequest(senderId, receiverId)
    }
    acceptRequest(userId, requestId) {
        return this.repository.acceptRequest(userId, requestId)
    }
    rejectRequest(userId, requestId) {
        return this.repository.rejectRequest(userId, requestId)
    }
    viewRequests(userId) {
        return this.repository.viewRequests(userId)
    }
}