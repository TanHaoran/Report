"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var User_1 = require('../entity/User');
var report_service_1 = require("../service/report.service");
// 登陆页面
var LoginComponent = (function () {
    function LoginComponent(router, formService) {
        this.router = router;
        this.formService = formService;
        this.model = new User_1.User(0, '', '');
    }
    // 登录
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.formService.postUser(this.model.username, this.model.password).subscribe(function (user) {
            console.log('获取JSON内容：' + JSON.stringify(user));
            if (user[0] && user[0].LoginName == _this.model.username) {
                localStorage.setItem('user', JSON.stringify(user[0]));
                _this.router.navigateByUrl('/report');
            }
            else {
                alert("用户或密码错误！");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thr-login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, report_service_1.ReportService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map