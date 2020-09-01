"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bcrypt = require('bcryptjs');

module.exports =
/*#__PURE__*/
function () {
  _createClass(_class, [{
    key: "encryptPassword",
    value: function encryptPassword(password) {
      var salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
      return password;
    }
  }]);

  function _class() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var fullname = arguments.length > 1 ? arguments[1] : undefined;
    var mobileNo = arguments.length > 2 ? arguments[2] : undefined;
    var email = arguments.length > 3 ? arguments[3] : undefined;
    var password = arguments.length > 4 ? arguments[4] : undefined;
    var profilePicture = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, _class);

    this.id = id;
    this.fullname = fullname;
    this.mobileNo = mobileNo;
    this.email = email;
    this.password = this.encryptPassword(password);
    this.profilePicture = profilePicture;
  }

  return _class;
}();