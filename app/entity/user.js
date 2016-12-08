"use strict";
var User = (function () {
    function User(
        // id
        id, 
        // 姓名
        username, 
        // 密码
        password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map