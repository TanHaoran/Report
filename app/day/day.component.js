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
var report_service_1 = require('../service/report.service');
var system_config_1 = require("../util/system.config");
var element_util_1 = require("../util/element-util");
var json_util_1 = require("../util/json-util");
// 每日汇报页面
var DayComponent = (function () {
    function DayComponent(router, formService) {
        this.router = router;
        this.formService = formService;
        // 敏感词汇结构
        this.sensitives = [];
    }
    DayComponent.prototype.ngOnInit = function () {
        // 读取所有上报表
        this.reportForms = system_config_1.SystemConfig.getReportForms();
    };
    // 当选择一个左侧报表的类型
    DayComponent.prototype.onSelect = function (rf) {
        var _this = this;
        this.selectedForm = rf;
        // 读取敏感词汇表结构
        this.formService.getSensitives(rf.id).subscribe(function (sensitives) {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            // 将Json转换成敏感词汇
            _this.sensitives = json_util_1.JsonUtil.parseJsonToSensitive(sensitives);
        });
    };
    /**
     * 限制输入框只能输入正整数
     * @param s
     * @param people
     */
    DayComponent.prototype.onlyNumber = function (s, people) {
        s.people = element_util_1.ElementUtil.makePositiveInteger(people);
    };
    /**
     * 提交表单数据
     */
    DayComponent.prototype.onSubmit = function () {
        this.formService.postSensitives(this.sensitives).subscribe(function (data) { return console.log(JSON.stringify(data)); }, function (error) { return alert(error); }, function () { return console.log("Finished"); });
    };
    DayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thr-day',
            templateUrl: 'day.component.html',
            styleUrls: ['day.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, report_service_1.ReportService])
    ], DayComponent);
    return DayComponent;
}());
exports.DayComponent = DayComponent;
//# sourceMappingURL=day.component.js.map