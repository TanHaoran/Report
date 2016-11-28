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
var report_service_1 = require('../service/report.service');
var system_config_1 = require("../util/system.config");
var json_util_1 = require("../util/json-util");
// 每月汇总页面
var MonthComponent = (function () {
    function MonthComponent(formService) {
        this.formService = formService;
        // 敏感词汇结构
        this.sensitives = [];
    }
    MonthComponent.prototype.ngOnInit = function () {
        // 读取所有上报表
        this.reportForms = system_config_1.SystemConfig.getReportForms();
    };
    // 当选择一个左侧报表的类型
    MonthComponent.prototype.onSelect = function (rf) {
        var _this = this;
        this.selectedForm = rf;
        // 读取敏感词汇表结构
        this.formService.getSensitives(rf.id).subscribe(function (sensitives) {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            // 将Json转换成敏感词汇
            _this.sensitives = json_util_1.JsonUtil.parseJsonToSensitive(sensitives);
        });
    };
    MonthComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'month.component.html',
            styleUrls: ['../day/day.component.css', 'month.component.css']
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService])
    ], MonthComponent);
    return MonthComponent;
}());
exports.MonthComponent = MonthComponent;
//# sourceMappingURL=month.component.js.map