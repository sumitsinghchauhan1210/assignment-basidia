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
    key: "removeFriend",
    value: function removeFriend(userId, friendId) {
      return this.repository.removeFriend(userId, friendId);
    }
  }, {
    key: "viewFriends",
    value: function viewFriends(userId) {
      console.log('in repository');
      return this.repository.viewFriends(userId);
    }
  }, {
    key: "viewMutualFriends",
    value: function viewMutualFriends(userId, friendId) {
      return this.repository.viewMutualFriends(userId, friendId);
    }
  }, {
    key: "viewFriendOfFriend",
    value: function viewFriendOfFriend(userId, friendId) {
      return this.repository.viewFriendOfFriend(userId, friendId);
    }
  }]);

  return _class;
}();