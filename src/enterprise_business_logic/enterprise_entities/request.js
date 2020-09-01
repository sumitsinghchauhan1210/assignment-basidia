module.exports = class {
    constructor(id = null, senderId, receiverId, status) {
        this.id = id
        this.senderId = senderId
        this.receiverId = receiverId
        this.status = status
    }
}