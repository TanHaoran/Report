"use strict";
var User = (function () {
    function User(
        // id
        id, 
        // 姓名
        name, 
        // 密码
        password, 
        // 所属科室
        office) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.office = office;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map