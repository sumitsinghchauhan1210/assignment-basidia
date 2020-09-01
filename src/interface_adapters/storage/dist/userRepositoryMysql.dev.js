"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../../framework_drivers/database/sequelize');

var _ = require('lodash');

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
    key: "encryptPassword",
    value: function encryptPassword(password) {
      var salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
      return password;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return regeneratorRuntime.async(function getAll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.model.findAll({
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"]
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
    key: "getById",
    value: function getById(id) {
      return regeneratorRuntime.async(function getById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  id: id
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
    key: "add",
    value: function add(userEntity) {
      var user;
      return regeneratorRuntime.async(function add$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.model.create(userEntity));

            case 2:
              user = _context3.sent;
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  id: user.dataValues.id
                },
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"]
                }
              }));

            case 5:
              return _context3.abrupt("return", _context3.sent);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "update",
    value: function update(id, updates, fields) {
      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log('updating user ', id, updates, fields);
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.model.update(updates, {
                where: {
                  id: id
                },
                fields: fields
              }));

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserByMobile",
    value: function getUserByMobile(mobileNo) {
      return regeneratorRuntime.async(function getUserByMobile$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  mobileNo: mobileNo
                }
              }));

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserByEmail",
    value: function getUserByEmail(email) {
      return regeneratorRuntime.async(function getUserByEmail$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.model.findOne({
                where: {
                  email: email
                }
              }));

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return _class;
}();