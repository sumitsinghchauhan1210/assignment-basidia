const router = require('express').Router()

// utilities
const _ = require('lodash')

// Response messages
const messages = require('../../../messages.json')

// Entity
const request = require('../../enterprise_business_logic/enterprise_entities/request')

// Use Cases
const requestUseCases = require('../../application_business_logic/use_cases/requestUseCases')
const useCases = new requestUseCases()

// Repository
const requestRepositoryMysql = require('../storage/requestRepositoryMysql')
const requestRepository = require('../../application_business_logic/repositories/requestRepository')
const repository = new requestRepository(new requestRepositoryMysql())

// token Checker
const tokenChecker = require('../middleware/tokenChecker')


router.post('/send', tokenChecker, async (req, res) => {
    const { userId, personId } = req.body
    try {
        const result = await useCases.sendRequest(userId, personId, repository)
        if (!_.isNull(result) && !_.isUndefined(result))
            res.status(201).json({
                status: true,
                message: messages.request_send_successfully
            })
        else {
            res.json({
                status: false,
                message: messages.incorrect_user_id
            })
        }
    } catch (error) {
        res.json({
            status: false,
            message: messages.failure,
            error: error.message
        })
    }
})


router.put('/accept/:requestId', tokenChecker, async (req, res) => {
    const { requestId } = req.params
    const { userId } = req.body
    try {
        const result = await useCases.acceptRequest(userId, requestId, repository)
        if (result) {
            res.json({
                status: true,
                message: messages.accepted_success
            })
        } else {
            res.json({
                status: false,
                message: messages.failure,
            })
        }
    } catch (error) {
        switch (error.message) {
            case 'Invalid Request':
                res.json({
                    status: false,
                    message: messages.failure,
                    error: messages.invalid_request
                })
                break;
            case 'Invalid User Request':
                res.json({
                    status: false,
                    message: messages.failure,
                    error: messages.invalid_user_request
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

router.put('/reject/:requestId', tokenChecker, async (req, res) => {
    const { requestId } = req.params
    const { userId } = req.body
    try {
        const result = await useCases.rejectRequest(userId, requestId, repository)
        if (result) {
            res.json({
                status: true,
                message: messages.rejected_success
            })
        } else {
            res.json({
                status: false,
                message: messages.failure,
            })
        }
    } catch (error) {
        switch (error.message) {
            case 'Invalid Request':
                res.json({
                    status: false,
                    message: messages.failure,
                    error: messages.invalid_request
                })
                break;
            case 'Invalid User Request':
                res.json({
                    status: false,
                    message: messages.failure,
                    error: messages.invalid_user_request
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

router.get('/', tokenChecker, async (req, res) => {
    const { userId } = req.body
    try {
        const result = await useCases.viewRequests(userId, repository)
        res.json({
            status: true,
            message: messages.success,
            result
        })
    } catch (error) {
        res.json({
            status: false,
            message: messages.failure,
            error: error.message
        })
    }
})


module.exports = router