"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var senderId = arguments.length > 1 ? arguments[1] : undefined;
    var receiverId = arguments.length > 2 ? arguments[2] : undefined;
    var status = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, _class);

    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.status = status;
  }

  return _class;
}();