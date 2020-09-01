"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../../framework_drivers/database/sequelize');

var _ = require('lodash');

var jwt = require('jsonwebtoken');

var config = require('../../../config.json');

var bcrypt = require('bcryptjs');

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);

    this.db = db;
    this.model = this.db.model('user');
  }

  _createClass(_class, [{
    key: "getUserByMobileNo",
    value: function getUserByMobileNo(mobileNo) {
      return regeneratorRuntime.async(function getUserByMobileNo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  mobileNo: mobileNo
                }
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
    key: "getUserByEmail",
    value: function getUserByEmail(email) {
      return regeneratorRuntime.async(function getUserByEmail$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  email: email
                }
              }));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "signIn",
    value: function signIn(email, password) {
      var user, isAuthenticated;
      return regeneratorRuntime.async(function signIn$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.getUserByEmail(email));

            case 2:
              user = _context3.sent;

              if (!(_.isNull(user) || _.isUndefined(user))) {
                _context3.next = 7;
                break;
              }

              throw new Error('user');

            case 7:
              isAuthenticated = bcrypt.compareSync(password, user.dataValues.password);

              if (!isAuthenticated) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", {
                accessToken: jwt.sign({
                  id: user.dataValues.id,
                  name: user.dataValues.fullname
                }, config.JWT_SECRET, {
                  expiresIn: config.JWT_LIFE
                }),
                refreshToken: jwt.sign({
                  id: user.dataValues.id,
                  name: user.dataValues.fullname
                }, config.REFRESH_JWT_SECRET, {
                  expiresIn: config.REFRESH_JWT_LIFE
                })
              });

            case 12:
              throw new Error('auth');

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "refresh",
    value: function refresh(userId) {
      var user;
      return regeneratorRuntime.async(function refresh$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  id: userId
                }
              }));

            case 2:
              user = _context4.sent;

              if (!(_.isNull(user) || _.isUndefined(user))) {
                _context4.next = 5;
                break;
              }

              throw new Error('user');

            case 5:
              return _context4.abrupt("return", {
                accessToken: jwt.sign({
                  id: user.dataValues.id,
                  name: user.dataValues.fullname
                }, config.JWT_SECRET, {
                  expiresIn: config.JWT_LIFE
                }),
                refreshToken: jwt.sign({
                  id: user.dataValues.id,
                  name: user.dataValues.fullname
                }, config.REFRESH_JWT_SECRET, {
                  expiresIn: config.REFRESH_JWT_LIFE
                })
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(userId, password) {
      return regeneratorRuntime.async(function resetPassword$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.model.update({
                password: password
              }, {
                where: {
                  id: userId
                },
                fields: ['password']
              }));

            case 2:
              return _context5.abrupt("return", true);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return _class;
}();