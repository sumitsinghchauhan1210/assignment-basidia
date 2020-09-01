module.exports = class {
    constructor(storageRepository) {
        this.repository = storageRepository
    }
    signIn(email, password) {
        return this.repository.signIn(email, password)
    }
    refresh(userId){
        return this.repository.refresh(userId)
    }
    resetPassword(userId, password){
        return this.repository.resetPassword(userId, password)
    }
}