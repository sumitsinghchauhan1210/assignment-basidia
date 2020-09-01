const bcrypt = require('bcryptjs')

module.exports = class {

    encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password, salt)
        return password
    }

    constructor(id = null, fullname, mobileNo, email, password, profilePicture = null) {
        this.id = id
        this.fullname = fullname
        this.mobileNo = mobileNo
        this.email = email
        this.password = this.encryptPassword(password)
        this.profilePicture = profilePicture
    }
}