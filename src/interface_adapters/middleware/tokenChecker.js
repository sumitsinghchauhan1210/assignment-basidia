const jwt = require('jsonwebtoken')
const config = require('../../../config.json')
const message = require('../../../messages.json')
module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401)
          .json({ 
            status: false,
            message: message.failure, 
            error: message.unauth_access 
          });
      }
      req.body = Object.assign(req.body, { userId: decoded.id })
      console.log('Token checker----------------', req.body)
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      status: false,
      message: message.error,
      error: message.no_token
    });
  }
}