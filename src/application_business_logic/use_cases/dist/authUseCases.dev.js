"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bcrypt = require('bcryptjs');

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "encryptPassword",
    value: function encryptPassword(password) {
      var salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
      return password;
    }
  }, {
    key: "signIn",
    value: function signIn(email, password, repository) {
      return repository.signIn(email, password);
    }
  }, {
    key: "refresh",
    value: function refresh(userId, repository) {
      return repository.refresh(userId);
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(userId, password, repository) {
      password = this.encryptPassword(password);
      return repository.resetPassword(userId, password);
    }
  }]);

  return _class;
}();