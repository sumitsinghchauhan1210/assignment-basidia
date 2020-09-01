"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../../framework_drivers/database/sequelize');

var Op = require('sequelize').Op;

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);

    this.db = db;
    this.model = this.db.model('friends');
    this.userModel = this.db.model('user');
  }

  _createClass(_class, [{
    key: "removeFriend",
    value: function removeFriend(userId, friendId) {
      var result;
      return regeneratorRuntime.async(function removeFriend$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.model.destroy({
                where: {
                  userId: userId,
                  friendId: friendId
                }
              }));

            case 2:
              result = _context.sent;

              if (!(result == 1)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", true);

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(this.model.destroy({
                where: {
                  userId: friendId,
                  friendId: userId
                }
              }));

            case 9:
              result = _context.sent;

            case 10:
              if (!(result == 1)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", true);

            case 12:
              return _context.abrupt("return", false);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewFriends",
    value: function viewFriends(userId) {
      var friends, friendsIds;
      return regeneratorRuntime.async(function viewFriends$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.model.findAll({
                attributes: ['userId'],
                where: {
                  friendId: userId
                }
              }));

            case 2:
              friends = _context2.sent;
              friendsIds = friends.map(function (val) {
                return val.dataValues.userId;
              });
              _context2.next = 6;
              return regeneratorRuntime.awrap(this.userModel.findAll({
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt", "mobileNo", "email"]
                },
                where: {
                  id: _defineProperty({}, Op["in"], friendsIds)
                }
              }));

            case 6:
              return _context2.abrupt("return", _context2.sent);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewMutualFriends",
    value: function viewMutualFriends(userId, friendId) {
      var friends, friendsIds, index1, index2;
      return regeneratorRuntime.async(function viewMutualFriends$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.model.findAll({
                attributes: ['userId'],
                where: _defineProperty({}, Op.or, [{
                  friendId: userId
                }, {
                  friendId: friendId
                }])
              }));

            case 2:
              friends = _context3.sent;
              friendsIds = friends.map(function (val) {
                return val.dataValues.userId;
              });
              index1 = friendsIds.indexOf(userId);
              if (index1 > -1) friendsIds.splice(index1, 1);
              index2 = friendsIds.indexOf(friendId);
              if (index2 > -1) friendsIds.splice(index2, 1);
              console.log('ids', friendsIds);
              _context3.next = 11;
              return regeneratorRuntime.awrap(this.userModel.findAll({
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt", "mobileNo", "email"]
                },
                where: {
                  id: _defineProperty({}, Op["in"], friendsIds)
                }
              }));

            case 11:
              return _context3.abrupt("return", _context3.sent);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewFriendOfFriend",
    value: function viewFriendOfFriend(userId, friendId) {
      var friends, friendsIds, index;
      return regeneratorRuntime.async(function viewFriendOfFriend$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.model.findAll({
                attributes: ['userId'],
                where: {
                  friendId: friendId
                }
              }));

            case 2:
              friends = _context4.sent;
              friendsIds = friends.map(function (val) {
                return val.dataValues.userId;
              });
              index = friendsIds.indexOf(userId);
              if (index > -1) friendsIds.splice(index, 1);
              _context4.next = 8;
              return regeneratorRuntime.awrap(this.userModel.findAll({
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt", "mobileNo", "email"]
                },
                where: {
                  id: _defineProperty({}, Op["in"], friendsIds)
                }
              }));

            case 8:
              return _context4.abrupt("return", _context4.sent);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return _class;
}();