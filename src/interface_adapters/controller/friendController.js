const router = require('express').Router()

// utilities
const _ = require('lodash')

// Response messages
const messages = require('../../../messages.json')

// Entity
const friend = require('../../enterprise_business_logic/enterprise_entities/friend')

// Use Cases
const friendUseCases = require('../../application_business_logic/use_cases/friendUseCases')
const useCases = new friendUseCases()

// Repository
const friendRepositoryMysql = require('../storage/friendRepositoryMysql')
const friendRepository = require('../../application_business_logic/repositories/friendRepository')
const repository = new friendRepository(new friendRepositoryMysql())

// token Checker
const tokenChecker = require('../middleware/tokenChecker')

router.post('/remove', tokenChecker, async (req, res) => {
    const { userId, friendId } = req.body
    try {
        const result = await useCases.removeFriend(userId, friendId, repository)
        if (result)
            res.json({
                status: true,
                message: messages.removed_success
            })
        res.json({
            status: false,
            message: messages.removed_fail,
            reason: messages.no_friend
        })
    } catch (error) {
        res.json({
            status: false,
            message: messages.failure,
            error: error.message
        })
    }
})


router.get('/view', tokenChecker, async (req, res) => {
    const { userId } = req.body
    try {
        const result = await useCases.viewFriends(userId, repository)
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

router.get('/view/mutual/:friendId', tokenChecker, async (req, res) => {
    const { userId } = req.body
    const { friendId } = req.params
    try {
        const result = await useCases.viewMutualFriends(userId, friendId, repository)
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


router.get('/view/friends/of/friend/:friendId', tokenChecker, async (req, res) => {
    const { userId } = req.body
    const { friendId } = req.params
    try {
        const result = await useCases.viewFriendOfFriend(userId, friendId, repository)
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