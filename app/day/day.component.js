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
var element_util_1 = require("../util/element-util");
var json_util_1 = require("../util/json-util");
var office_1 = require("../entity/office");
// 每日汇报页面
var DayComponent = (function () {
    function DayComponent(formService) {
        this.formService = formService;
        // 敏感词汇结构
        this.sensitives = [];
        // 所有科室集合
        this.offices = [];
        // 用来在界面上显示当天的日期
        this.today = new Date().toLocaleDateString();
    }
    DayComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 读取所有上报表
        this.reportForms = system_config_1.SystemConfig.getReportForms();
        this.formService.getOffices().subscribe(function (offices) {
            console.log('获取JSON内容：' + JSON.stringify(offices));
            for (var i = 0; i < offices.length; i++) {
                var office = new office_1.Office();
                office.id = offices[i].OfficeID;
                office.name = offices[i].OfficeName;
                _this.offices.push(office);
            }
            // 初始化默认选择科室
            if (offices.length > 0) {
                _this.officeName = offices[0].OfficeName;
            }
            else {
                _this.officeName = '';
            }
        });
    };
    /**
     * 当选择一个左侧报表的类型
     * @param rf
     */
    DayComponent.prototype.onSelectForm = function (rf) {
        var _this = this;
        this.selectedForm = rf;
        // 读取敏感词汇表结构
        this.formService.getSensitives(rf.id).subscribe(function (sensitives) {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            // 将Json转换成敏感词汇
            _this.sensitives = json_util_1.JsonUtil.parseJsonToSensitive(sensitives);
            // 先获取科室id
            var officeId = json_util_1.JsonUtil.getOfficeId(_this.officeName, _this.offices);
            // 更新右侧显示信息
            _this.updateSensitiveData(officeId, _this.today);
        });
    };
    /**
     * 在更换选择科室之后更新数据
     */
    DayComponent.prototype.onSelectOffice = function (officeName) {
        // 先获取科室id
        var officeId = json_util_1.JsonUtil.getOfficeId(officeName, this.offices);
        // 更新右侧显示信息
        this.updateSensitiveData(officeId, this.today);
    };
    /**
     * 更新右侧显示信息
     * @param officeId 科室id
     * @param date 查询日期
     */
    DayComponent.prototype.updateSensitiveData = function (officeId, date) {
        var _this = this;
        this.formService.getSensitiveData(officeId, date).subscribe(function (sensitiveData) {
            console.log(sensitiveData);
            var jsonArray = JSON.parse(sensitiveData);
            if (jsonArray.length > 0) {
                // 将读取出来的人数数据显示在界面上
                _this.sensitives = json_util_1.JsonUtil.addPeopleToSensitive(jsonArray, _this.sensitives);
            }
            else {
                _this.sensitives = json_util_1.JsonUtil.setEmptyPepleToSensitive(_this.sensitives);
            }
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
        // 先获取科室id
        var officeId = json_util_1.JsonUtil.getOfficeId(this.officeName, this.offices);
        this.formService.postSensitiveData(officeId, system_config_1.SystemConfig.getUserId(), this.today, this.sensitives).subscribe(function (data) {
            console.log(JSON.stringify(data));
            alert(JSON.stringify(data));
        }, function (error) { return alert(error); }, function () {
            console.log("Finished");
        });
    };
    DayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thr-day',
            templateUrl: 'day.component.html',
            styleUrls: ['day.component.css']
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService])
    ], DayComponent);
    return DayComponent;
}());
exports.DayComponent = DayComponent;
//# sourceMappingURL=day.component.js.map