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
    key: "sendRequest",
    value: function sendRequest(senderId, receiverId) {
      return this.repository.sendRequest(senderId, receiverId);
    }
  }, {
    key: "acceptRequest",
    value: function acceptRequest(userId, requestId) {
      return this.repository.acceptRequest(userId, requestId);
    }
  }, {
    key: "rejectRequest",
    value: function rejectRequest(userId, requestId) {
      return this.repository.rejectRequest(userId, requestId);
    }
  }, {
    key: "viewRequests",
    value: function viewRequests(userId) {
      return this.repository.viewRequests(userId);
    }
  }]);

  return _class;
}();