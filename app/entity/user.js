"use strict";
var User = (function () {
    function User(
        // id
        id, 
        // 姓名
        username, 
        // 密码
        password, 
        // 所属科室
        office) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.office = office;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map