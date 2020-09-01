const _ = require('lodash')

module.exports = class {
    checkUpdateFields(updates) {
        const { fullname, mobileNo, email, profilePicture } = updates
        const fields = []
        if (!_.isUndefined(fullname) && !_.isNull(fullname)) fields.push('fullname')
        else delete updates.fullname
        if (!_.isUndefined(mobileNo) && !_.isNull(mobileNo)) fields.push('mobileNo')
        else delete updates.mobileNo
        if (!_.isUndefined(email) && !_.isNull(email)) fields.push('email')
        else delete updates.email
        if (!_.isUndefined(profilePicture) && !_.isNull(profilePicture)) fields.push('profilePicture')
        else delete updates.profilePicture
        return fields
    }
    registerUser(userEntity, repository) {
        return repository.registerUser(userEntity)
    }
    updateProfile(id, updates, repository) {
        const fields = this.checkUpdateFields(updates)
        return repository.updateProfile(id, updates, fields)
    }
    getAllUsers(repository) {
        return repository.getAllUsers()
    }
    getUserById(id, repository) {
        return repository.getUserById(id)
    }
    getUserByMobile(mobileNo, repository) {
        return repository.getUserByMobile(mobileNo)
    }
    getUserByEmail(email, repository) {
        return repository.getUserByEmail(email)
    }
}