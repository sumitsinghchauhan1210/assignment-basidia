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
    key: "signIn",
    value: function signIn(email, password) {
      return this.repository.signIn(email, password);
    }
  }, {
    key: "refresh",
    value: function refresh(userId) {
      return this.repository.refresh(userId);
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(userId, password) {
      return this.repository.resetPassword(userId, password);
    }
  }]);

  return _class;
}();