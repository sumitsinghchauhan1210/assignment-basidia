"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "sendRequest",
    value: function sendRequest(senderId, receiverId, repository) {
      return repository.sendRequest(senderId, receiverId);
    }
  }, {
    key: "acceptRequest",
    value: function acceptRequest(userId, requestId, repository) {
      return repository.acceptRequest(userId, requestId);
    }
  }, {
    key: "rejectRequest",
    value: function rejectRequest(userId, requestId, repository) {
      return repository.rejectRequest(userId, requestId);
    }
  }, {
    key: "viewRequests",
    value: function viewRequests(userId, repository) {
      return repository.viewRequests(userId);
    }
  }]);

  return _class;
}();