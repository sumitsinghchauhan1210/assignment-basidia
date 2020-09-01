const bcrypt = require('bcryptjs')
module.exports = class {
    encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password, salt)
        return password
    }

    signIn(email, password, repository) {
        return repository.signIn(email, password)
    }
    refresh(userId, repository) {
        return repository.refresh(userId)
    }
    resetPassword(userId, password, repository) {
        password = this.encryptPassword(password)
        return repository.resetPassword(userId, password)
    }
}