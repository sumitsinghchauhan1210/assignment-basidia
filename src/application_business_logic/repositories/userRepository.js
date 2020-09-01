module.exports = class {
    constructor(storageRepository){
        this.repository = storageRepository
    }
    registerUser(userEntity){
        return this.repository.add(userEntity)
    }
    updateProfile(id,updates,fields){
        return this.repository.update(id,updates,fields)
    }
    getAllUsers(){
        return this.repository.getAll()
    }
    getUserById(id){
        return this.repository.getById(id)
    }
    getUserByMobile(mobileNo){
        return this.repository.getUserByMobile(mobileNo)
    }
    getUserByEmail(email){
        return this.repository.getUserByEmail(email)
    }
}