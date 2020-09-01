// Router
const router = require('express').Router()

// Response messages
const messages = require('../../../messages.json')

// Utilities
const _ = require('lodash')

// Entity
const userEntity = require('../../enterprise_business_logic/enterprise_entities/user')

// Entity Use Cases
const userUseCases = require('../../application_business_logic/use_cases/userUseCases')
const useCases = new userUseCases()

// Storage Repository
const userRepositoryMysql = require('../storage/userRepositoryMysql')
const userRepository = require('../../application_business_logic/repositories/userRepository')
const repository = new userRepository(new userRepositoryMysql())

// File Store
const upload = require('../../framework_drivers/database/fileStore')

// Token Checker
const tokenChecker = require('../middleware/tokenChecker')



router.get('/', async (req, res) => {
    try {
        let result = await useCases.getAllUsers(repository)
        res.json({
            status: true,
            message: messages.success,
            result
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: messages.failure,
            error: error.message
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        let result = await useCases.getUserById(id, repository)
        res.json({
            status: true,
            message: messages.success,
            result
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: messages.failure,
            error: error.message
        })
    }
})

router.post('/', async (req, res) => {
    const { fullname, mobileNo, email, password } = req.body
    const entity = new userEntity(null, fullname, mobileNo, email, password, null)
    try {
        if (password.length < 8 || _.isEqual(password, '') || _.isNull(password) || _.isUndefined(password)) throw new Error('Password')
        const result = await useCases.registerUser(entity, repository)
        if (!_.isNull(result)) {
            delete result.password
            res.status(201).json({
                status: true,
                message: messages.success,
                result
            })
        }
        else res.json({
            status: false,
            message: messages.error_message,
            errors: result
        })
    } catch (error) {
        console.log(error)
        switch (error) {
            case 'Password':
                res.json({
                    status: false,
                    message: messages.failure,
                    error: error.password_error
                })
                break;

            default:
                res.json({
                    status: false,
                    message: messages.failure,
                    error: error.message
                })
                break;
        }

    }
})

router.put('/:id', tokenChecker, upload.single('profilePic'), async (req, res) => {
    const { id } = req.params
    let { mobileNo, email, fullname } = req.body
    let updates = { mobileNo, email, fullname }
    const file = req.file
    if (!_.isUndefined(file))
        updates['profilePicture'] = file.filename
    try {
        console.log('file is', file, updates)
        const result = await useCases.updateProfile(id, updates, repository)
        if (_.isArray(result) && result[0] == 1)
            res.json({
                status: true,
                message: messages.success
            })
        else res.json({
            status: false,
            message: messages.error_message,
            error: messages.no_update
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: messages.failure,
            error: error.message
        })
    }
})


module.exports = router