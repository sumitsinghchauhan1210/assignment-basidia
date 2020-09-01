"use strict";

var router = require('express').Router(); // utilities


var _ = require('lodash'); // Response messages


var messages = require('../../../messages.json'); // Entity


var request = require('../../enterprise_business_logic/enterprise_entities/request'); // Use Cases


var requestUseCases = require('../../application_business_logic/use_cases/requestUseCases');

var useCases = new requestUseCases(); // Repository

var requestRepositoryMysql = require('../storage/requestRepositoryMysql');

var requestRepository = require('../../application_business_logic/repositories/requestRepository');

var repository = new requestRepository(new requestRepositoryMysql()); // token Checker

var tokenChecker = require('../middleware/tokenChecker');

router.post('/send', tokenChecker, function _callee(req, res) {
  var _req$body, userId, personId, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, personId = _req$body.personId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(useCases.sendRequest(userId, personId, repository));

        case 4:
          result = _context.sent;
          if (!_.isNull(result) && !_.isUndefined(result)) res.status(201).json({
            status: true,
            message: messages.request_send_successfully
          });else {
            res.json({
              status: false,
              message: messages.incorrect_user_id
            });
          }
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
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
  }, null, null, [[1, 8]]);
});
router.put('/accept/:requestId', tokenChecker, function _callee2(req, res) {
  var requestId, userId, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          requestId = req.params.requestId;
          userId = req.body.userId;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(useCases.acceptRequest(userId, requestId, repository));

        case 5:
          result = _context2.sent;

          if (result) {
            res.json({
              status: true,
              message: messages.accepted_success
            });
          } else {
            res.json({
              status: false,
              message: messages.failure
            });
          }

          _context2.next = 20;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          _context2.t1 = _context2.t0.message;
          _context2.next = _context2.t1 === 'Invalid Request' ? 14 : _context2.t1 === 'Invalid User Request' ? 16 : 18;
          break;

        case 14:
          res.json({
            status: false,
            message: messages.failure,
            error: messages.invalid_request
          });
          return _context2.abrupt("break", 20);

        case 16:
          res.json({
            status: false,
            message: messages.failure,
            error: messages.invalid_user_request
          });
          return _context2.abrupt("break", 20);

        case 18:
          res.json({
            status: false,
            message: messages.failure,
            error: _context2.t0.message
          });
          return _context2.abrupt("break", 20);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.put('/reject/:requestId', tokenChecker, function _callee3(req, res) {
  var requestId, userId, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          requestId = req.params.requestId;
          userId = req.body.userId;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(useCases.rejectRequest(userId, requestId, repository));

        case 5:
          result = _context3.sent;

          if (result) {
            res.json({
              status: true,
              message: messages.rejected_success
            });
          } else {
            res.json({
              status: false,
              message: messages.failure
            });
          }

          _context3.next = 20;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          _context3.t1 = _context3.t0.message;
          _context3.next = _context3.t1 === 'Invalid Request' ? 14 : _context3.t1 === 'Invalid User Request' ? 16 : 18;
          break;

        case 14:
          res.json({
            status: false,
            message: messages.failure,
            error: messages.invalid_request
          });
          return _context3.abrupt("break", 20);

        case 16:
          res.json({
            status: false,
            message: messages.failure,
            error: messages.invalid_user_request
          });
          return _context3.abrupt("break", 20);

        case 18:
          res.json({
            status: false,
            message: messages.failure,
            error: _context3.t0.message
          });
          return _context3.abrupt("break", 20);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.get('/', tokenChecker, function _callee4(req, res) {
  var userId, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.body.userId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(useCases.viewRequests(userId, repository));

        case 4:
          result = _context4.sent;
          res.json({
            status: true,
            message: messages.success,
            result: result
          });
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.json({
            status: false,
            message: messages.failure,
            error: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;