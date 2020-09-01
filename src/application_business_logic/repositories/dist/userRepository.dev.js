"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function _class(storageRepository) {
    _classCallCheck(this, _class);

    this.repository = storageRepository;
  }

  _createClass(_class, [{
    key: "registerUser",
    value: function registerUser(userEntity) {
      return this.repository.add(userEntity);
    }
  }, {
    key: "updateProfile",
    value: function updateProfile(id, updates, fields) {
      return this.repository.update(id, updates, fields);
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      return this.repository.getAll();
    }
  }, {
    key: "getUserById",
    value: function getUserById(id) {
      return this.repository.getById(id);
    }
  }, {
    key: "getUserByMobile",
    value: function getUserByMobile(mobileNo) {
      return this.repository.getUserByMobile(mobileNo);
    }
  }, {
    key: "getUserByEmail",
    value: function getUserByEmail(email) {
      return this.repository.getUserByEmail(email);
    }
  }]);

  return _class;
}();