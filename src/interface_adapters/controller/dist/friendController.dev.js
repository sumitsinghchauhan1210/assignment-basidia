"use strict";

var router = require('express').Router(); // utilities


var _ = require('lodash'); // Response messages


var messages = require('../../../messages.json'); // Entity


var friend = require('../../enterprise_business_logic/enterprise_entities/friend'); // Use Cases


var friendUseCases = require('../../application_business_logic/use_cases/friendUseCases');

var useCases = new friendUseCases(); // Repository

var friendRepositoryMysql = require('../storage/friendRepositoryMysql');

var friendRepository = require('../../application_business_logic/repositories/friendRepository');

var repository = new friendRepository(new friendRepositoryMysql()); // token Checker

var tokenChecker = require('../middleware/tokenChecker');

router.post('/remove', tokenChecker, function _callee(req, res) {
  var _req$body, userId, friendId, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, friendId = _req$body.friendId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(useCases.removeFriend(userId, friendId, repository));

        case 4:
          result = _context.sent;
          if (result) res.json({
            status: true,
            message: messages.removed_success
          });
          res.json({
            status: false,
            message: messages.removed_fail,
            reason: messages.no_friend
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          res.json({
            status: false,
            message: messages.failure,
            error: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
router.get('/view', tokenChecker, function _callee2(req, res) {
  var userId, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.body.userId;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(useCases.viewFriends(userId, repository));

        case 4:
          result = _context2.sent;
          res.json({
            status: true,
            message: messages.success,
            result: result
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.json({
            status: false,
            message: messages.failure,
            error: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get('/view/mutual/:friendId', tokenChecker, function _callee3(req, res) {
  var userId, friendId, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.userId;
          friendId = req.params.friendId;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(useCases.viewMutualFriends(userId, friendId, repository));

        case 5:
          result = _context3.sent;
          res.json({
            status: true,
            message: messages.success,
            result: result
          });
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          res.json({
            status: false,
            message: messages.failure,
            error: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.get('/view/friends/of/friend/:friendId', tokenChecker, function _callee4(req, res) {
  var userId, friendId, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.body.userId;
          friendId = req.params.friendId;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(useCases.viewFriendOfFriend(userId, friendId, repository));

        case 5:
          result = _context4.sent;
          res.json({
            status: true,
            message: messages.success,
            result: result
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](2);
          res.json({
            status: false,
            message: messages.failure,
            error: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
module.exports = router;