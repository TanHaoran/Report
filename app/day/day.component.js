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
var sensitive_1 = require("../entity/sensitive");
var system_config_1 = require("../util/system.config");
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
            _this.sensitives = _this.parseJsonToSensitive(sensitives);
        });
    };
    /**
     * 将Json转换成敏感词汇
     * @param sensitives 敏感词汇json字串
     */
    DayComponent.prototype.parseJsonToSensitive = function (sensitives) {
        // 最终要返回的结果集合
        var sensitiveArray = new Array();
        for (var i = 0; i < sensitives.length; i++) {
            // 从json中取出每一个属性
            var sensitiveId = sensitives[i].SensitiveId;
            var name = sensitives[i].Name;
            var parentName = sensitives[i].ParentName;
            var hasChildren = sensitives[i].HasChildren;
            var reportFormId = sensitives[i].ReportFormId;
            // 构建敏感词
            var s = new sensitive_1.Sensitive();
            s.sensitiveId = sensitiveId;
            s.name = name;
            s.parentName = parentName;
            s.hasChildren = hasChildren;
            s.reportFormId = reportFormId;
            // 如果是不是父级就直接添加进去，如果是父级就跳过
            if (!hasChildren) {
                sensitiveArray.push(s);
            }
        }
        return sensitiveArray;
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