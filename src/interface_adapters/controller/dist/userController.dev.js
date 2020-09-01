"use strict";

// Router
var router = require('express').Router(); // Response messages


var messages = require('../../../messages.json'); // Utilities


var _ = require('lodash'); // Entity


var userEntity = require('../../enterprise_business_logic/enterprise_entities/user'); // Entity Use Cases


var userUseCases = require('../../application_business_logic/use_cases/userUseCases');

var useCases = new userUseCases(); // Storage Repository

var userRepositoryMysql = require('../storage/userRepositoryMysql');

var userRepository = require('../../application_business_logic/repositories/userRepository');

var repository = new userRepository(new userRepositoryMysql()); // File Store

var upload = require('../../framework_drivers/database/fileStore'); // Token Checker


var tokenChecker = require('../middleware/tokenChecker');

router.get('/', function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(useCases.getAllUsers(repository));

        case 3:
          result = _context.sent;
          res.json({
            status: true,
            message: messages.success,
            result: result
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            status: false,
            message: messages.failure,
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/:id', function _callee2(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(useCases.getUserById(id, repository));

        case 4:
          result = _context2.sent;
          res.json({
            status: true,
            message: messages.success,
            result: result
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.json({
            status: false,
            message: messages.failure,
            error: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.post('/', function _callee3(req, res) {
  var _req$body, fullname, mobileNo, email, password, entity, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, fullname = _req$body.fullname, mobileNo = _req$body.mobileNo, email = _req$body.email, password = _req$body.password;
          entity = new userEntity(null, fullname, mobileNo, email, password, null);
          _context3.prev = 2;

          if (!(password.length < 8 || _.isEqual(password, '') || _.isNull(password) || _.isUndefined(password))) {
            _context3.next = 5;
            break;
          }

          throw new Error('Password');

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(useCases.registerUser(entity, repository));

        case 7:
          result = _context3.sent;

          if (!_.isNull(result)) {
            delete result.password;
            res.status(201).json({
              status: true,
              message: messages.success,
              result: result
            });
          } else res.json({
            status: false,
            message: messages.error_message,
            errors: result
          });

          _context3.next = 21;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);
          _context3.t1 = _context3.t0;
          _context3.next = _context3.t1 === 'Password' ? 17 : 19;
          break;

        case 17:
          res.json({
            status: false,
            message: messages.failure,
            error: _context3.t0.password_error
          });
          return _context3.abrupt("break", 21);

        case 19:
          res.json({
            status: false,
            message: messages.failure,
            error: _context3.t0.message
          });
          return _context3.abrupt("break", 21);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
router.put('/:id', tokenChecker, upload.single('profilePic'), function _callee4(req, res) {
  var id, _req$body2, mobileNo, email, fullname, updates, file, result;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, mobileNo = _req$body2.mobileNo, email = _req$body2.email, fullname = _req$body2.fullname;
          updates = {
            mobileNo: mobileNo,
            email: email,
            fullname: fullname
          };
          file = req.file;
          if (!_.isUndefined(file)) updates['profilePicture'] = file.filename;
          _context4.prev = 5;
          console.log('file is', file, updates);
          _context4.next = 9;
          return regeneratorRuntime.awrap(useCases.updateProfile(id, updates, repository));

        case 9:
          result = _context4.sent;
          if (_.isArray(result) && result[0] == 1) res.json({
            status: true,
            message: messages.success
          });else res.json({
            status: false,
            message: messages.error_message,
            error: messages.no_update
          });
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](5);
          console.log(_context4.t0);
          res.json({
            status: false,
            message: messages.failure,
            error: _context4.t0.message
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 13]]);
});
module.exports = router;