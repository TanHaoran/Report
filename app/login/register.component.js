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
var RegisterComponent = (function () {
    function RegisterComponent(router, formService) {
        this.router = router;
        this.formService = formService;
        this.model = new User_1.User(0, '', '', '');
        this.officeNames = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formService.getOffices().subscribe(function (offices) {
            console.log('获取JSON内容：' + JSON.stringify(offices));
            for (var i = 0; i < offices.length; i++) {
                _this.officeNames[i] = offices[i].OfficeName;
            }
        });
    };
    // 注册
    RegisterComponent.prototype.onSubmit = function () {
        this.router.navigateByUrl('/login');
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thr-login',
            templateUrl: 'register.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, report_service_1.ReportService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map