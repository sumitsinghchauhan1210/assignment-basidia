// Router
const router = require('express').Router()

// Response messages
const messages = require('../../../messages.json')

// Utilities
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../../../config.json')

// Entity Use Cases
const authUseCases = require('../../application_business_logic/use_cases/authUseCases')
const useCases = new authUseCases()

// Storage Repository
const authRepositoryMysql = require('../storage/authRepositoryMysql')
const authRepository = require('../../application_business_logic/repositories/authRepository')
const repository = new authRepository(new authRepositoryMysql())

// tokenChecker
const tokenChecker = require('../middleware/tokenChecker')

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await useCases.signIn(email, password, repository)
        res.json({
            status: true,
            message: messages.signin_success,
            token: result
        })
    } catch (error) {
        console.log(error)
        switch (error.message) {
            case 'auth':
                res.json({
                    status: false,
                    message: messages.signin_failure,
                    error: error.signin_error
                })
                break;
            case 'user':
                res.json({
                    status: false,
                    message: messages.signin_failure,
                    error: error.no_user
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


router.post('/refresh', async (req, res) => {
    const token = req.body.refreshToken || req.query.refreshToken || req.headers['refresh-token']
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.REFRESH_JWT_SECRET, async function (err, decoded) {
            if (err) {
                return res.status(401)
                    .json({
                        status: false,
                        message: messages.failure,
                        error: messages.unauth_access
                    });
            }
            const userId = decoded.id
            const result = await useCases.refresh(userId, repository)
            res.json({
                status: true,
                message: messages.access_token_refreshed,
                tokens: result
            })
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            status: false,
            message: messages.error,
            error: messages.no_token
        });
    }
})

router.post('/reset/password', tokenChecker, async (req, res) => {
    const { userId, password } = req.body
    try {
        await useCases.resetPassword(userId, password, repository)
        res.json({
            status: true,
            message: messages.password_reset
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: messages.error,
            error: error.message
        });
    }
})

module.exports = router