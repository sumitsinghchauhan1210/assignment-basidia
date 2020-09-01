"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _ = require('lodash');

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "checkUpdateFields",
    value: function checkUpdateFields(updates) {
      var fullname = updates.fullname,
          mobileNo = updates.mobileNo,
          email = updates.email,
          profilePicture = updates.profilePicture;
      var fields = [];
      if (!_.isUndefined(fullname) && !_.isNull(fullname)) fields.push('fullname');else delete updates.fullname;
      if (!_.isUndefined(mobileNo) && !_.isNull(mobileNo)) fields.push('mobileNo');else delete updates.mobileNo;
      if (!_.isUndefined(email) && !_.isNull(email)) fields.push('email');else delete updates.email;
      if (!_.isUndefined(profilePicture) && !_.isNull(profilePicture)) fields.push('profilePicture');else delete updates.profilePicture;
      return fields;
    }
  }, {
    key: "registerUser",
    value: function registerUser(userEntity, repository) {
      return repository.registerUser(userEntity);
    }
  }, {
    key: "updateProfile",
    value: function updateProfile(id, updates, repository) {
      var fields = this.checkUpdateFields(updates);
      return repository.updateProfile(id, updates, fields);
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers(repository) {
      return repository.getAllUsers();
    }
  }, {
    key: "getUserById",
    value: function getUserById(id, repository) {
      return repository.getUserById(id);
    }
  }, {
    key: "getUserByMobile",
    value: function getUserByMobile(mobileNo, repository) {
      return repository.getUserByMobile(mobileNo);
    }
  }, {
    key: "getUserByEmail",
    value: function getUserByEmail(email, repository) {
      return repository.getUserByEmail(email);
    }
  }]);

  return _class;
}();