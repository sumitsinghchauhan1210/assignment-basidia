"use strict";

// Router
var router = require('express').Router(); // Response messages


var messages = require('../../../messages.json'); // Utilities


var _ = require('lodash');

var jwt = require('jsonwebtoken');

var config = require('../../../config.json'); // Entity Use Cases


var authUseCases = require('../../application_business_logic/use_cases/authUseCases');

var useCases = new authUseCases(); // Storage Repository

var authRepositoryMysql = require('../storage/authRepositoryMysql');

var authRepository = require('../../application_business_logic/repositories/authRepository');

var repository = new authRepository(new authRepositoryMysql()); // tokenChecker

var tokenChecker = require('../middleware/tokenChecker');

router.post('/signin', function _callee(req, res) {
  var _req$body, email, password, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(useCases.signIn(email, password, repository));

        case 4:
          result = _context.sent;
          res.json({
            status: true,
            message: messages.signin_success,
            token: result
          });
          _context.next = 20;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          _context.t1 = _context.t0.message;
          _context.next = _context.t1 === 'auth' ? 14 : _context.t1 === 'user' ? 16 : 18;
          break;

        case 14:
          res.json({
            status: false,
            message: messages.signin_failure,
            error: _context.t0.signin_error
          });
          return _context.abrupt("break", 20);

        case 16:
          res.json({
            status: false,
            message: messages.signin_failure,
            error: _context.t0.no_user
          });
          return _context.abrupt("break", 20);

        case 18:
          res.json({
            status: false,
            message: messages.failure,
            error: _context.t0.message
          });
          return _context.abrupt("break", 20);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.post('/refresh', function _callee3(req, res) {
  var token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = req.body.refreshToken || req.query.refreshToken || req.headers['refresh-token']; // decode token

          if (!token) {
            _context3.next = 5;
            break;
          }

          // verifies secret and checks exp
          jwt.verify(token, config.REFRESH_JWT_SECRET, function _callee2(err, decoded) {
            var userId, result;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!err) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", res.status(401).json({
                      status: false,
                      message: messages.failure,
                      error: messages.unauth_access
                    }));

                  case 2:
                    userId = decoded.id;
                    _context2.next = 5;
                    return regeneratorRuntime.awrap(useCases.refresh(userId, repository));

                  case 5:
                    result = _context2.sent;
                    res.json({
                      status: true,
                      message: messages.access_token_refreshed,
                      tokens: result
                    });

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          _context3.next = 6;
          break;

        case 5:
          return _context3.abrupt("return", res.status(403).send({
            status: false,
            message: messages.error,
            error: messages.no_token
          }));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/reset/password', tokenChecker, function _callee4(req, res) {
  var _req$body2, userId, password;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, userId = _req$body2.userId, password = _req$body2.password;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(useCases.resetPassword(userId, password, repository));

        case 4:
          res.json({
            status: true,
            message: messages.password_reset
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(500).send({
            status: false,
            message: messages.error,
            error: _context4.t0.message
          }));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
module.exports = router;