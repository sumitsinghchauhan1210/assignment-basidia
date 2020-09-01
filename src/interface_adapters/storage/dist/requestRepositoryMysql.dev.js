"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../../framework_drivers/database/sequelize');

var _ = require('lodash');

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);

    this.db = db;
    this.model = this.db.model('request');
    this.userModel = this.db.model('user');
    this.friendModel = this.db.model('friends');
  }

  _createClass(_class, [{
    key: "sendRequest",
    value: function sendRequest(senderId, receiverId) {
      return regeneratorRuntime.async(function sendRequest$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.model.create({
                senderId: senderId,
                receiverId: receiverId
              }));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "acceptRequest",
    value: function acceptRequest(userId, requestId) {
      var request, result;
      return regeneratorRuntime.async(function acceptRequest$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  id: requestId
                }
              }));

            case 2:
              request = _context2.sent;
              console.log('request is --', request.dataValues.receiverId, userId);

              if (!_.isNull(request)) {
                _context2.next = 6;
                break;
              }

              throw new Error('Invalid Request');

            case 6:
              if (_.isEqual(request.dataValues.receiverId, userId)) {
                _context2.next = 8;
                break;
              }

              throw new Error('Invalid User Request');

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(this.model.update({
                status: 'Confirmed'
              }, {
                where: {
                  id: requestId
                },
                fields: ['status']
              }));

            case 10:
              result = _context2.sent;

              if (!(result[0] == 1)) {
                _context2.next = 15;
                break;
              }

              _context2.next = 14;
              return regeneratorRuntime.awrap(this.friendModel.create({
                userId: request.dataValues.senderId,
                friendId: request.dataValues.receiverId
              }));

            case 14:
              return _context2.abrupt("return", true);

            case 15:
              return _context2.abrupt("return", false);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "rejectRequest",
    value: function rejectRequest(userId, requestId) {
      var request, result;
      return regeneratorRuntime.async(function rejectRequest$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  id: requestId
                }
              }));

            case 2:
              request = _context3.sent;

              if (!_.isNull(request)) {
                _context3.next = 5;
                break;
              }

              throw new Error('Invalid Request');

            case 5:
              if (_.isEqual(request.dataValues.receiverId, userId)) {
                _context3.next = 7;
                break;
              }

              throw new Error('Invalid User Request');

            case 7:
              _context3.next = 9;
              return regeneratorRuntime.awrap(this.model.update({
                status: 'Cancelled'
              }, {
                where: {
                  id: requestId
                },
                fields: ['status']
              }));

            case 9:
              result = _context3.sent;

              if (!(result[0] == 1)) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", true);

            case 12:
              return _context3.abrupt("return", false);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewRequests",
    value: function viewRequests(userId) {
      return regeneratorRuntime.async(function viewRequests$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.model.findAll({
                attributes: ['senderId', ['id', 'requestId']],
                where: {
                  receiverId: userId,
                  status: 'Pending'
                },
                include: [{
                  attributes: {
                    exclude: ["id", "password", "createdAt", "updatedAt", "email", "mobileNo"]
                  },
                  model: this.userModel,
                  as: 'sender'
                }]
              }));

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return _class;
}();