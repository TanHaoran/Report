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
var user_1 = require("./entity/user");
var system_config_1 = require("./util/system.config");
var report_service_1 = require("./service/report.service");
// 首页页面
var ReportComponent = (function () {
    function ReportComponent(reportService) {
        this.reportService = reportService;
        this.user = new user_1.User(0, '', '', '');
    }
    ReportComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User(0, '', '', '');
        this.user.username = system_config_1.SystemConfig.getUsername();
        // 读取所有表结构
        this.reportService.getReportForm().subscribe(function (reportForms) {
            console.log('获取JSON内容：' + JSON.stringify(reportForms));
            localStorage.setItem('report_form', JSON.stringify(reportForms));
        });
    };
    ReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thr-report',
            templateUrl: 'report.component.html',
            styleUrls: ['app.component.css', 'report.component.css']
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map