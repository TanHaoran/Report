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
var office_1 = require("../entity/office");
// 每月汇总页面
var MonthComponent = (function () {
    function MonthComponent(formService) {
        this.formService = formService;
        // 敏感词汇结构
        this.sensitives = [];
        // 所有科室集合
        this.offices = [];
        this.days = [];
        // 当月的敏感词汇集合
        this.monthSensitives = [];
    }
    MonthComponent.prototype.ngOnInit = function () {
        // 初始化所有敏感词汇
        this.initSensitives();
        // 初始化左侧的天数
        this.initIndex();
    };
    /**
     * 初始化所有敏感词汇
     */
    MonthComponent.prototype.initSensitives = function () {
        var _this = this;
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
     * 初始化左侧的天数
     */
    MonthComponent.prototype.initIndex = function () {
        var year = new Date().getFullYear();
        var month = new Date().getMonth();
        // 获取某年某月的所有天数
        var days = this.getDaysOfMonth(year, month);
        for (var i = 0; i < days; i++) {
            this.days[i] = i + 1;
        }
    };
    // 当选择一个左侧报表的类型
    MonthComponent.prototype.onSelect = function (rf) {
        var _this = this;
        if (this.selectedForm != rf) {
            this.selectedForm = rf;
            // 读取敏感词汇表结构
            this.formService.getSensitives(rf.id).subscribe(function (sensitives) {
                console.log('获取JSON内容：' + JSON.stringify(sensitives));
                // 将Json转换成敏感词汇
                _this.sensitives = json_util_1.JsonUtil.parseJsonToSensitive(sensitives);
                // 先获取科室id
                var officeId = json_util_1.JsonUtil.getOfficeId(_this.officeName, _this.offices);
                // 获取每一天的数据，更新界面
                for (var i = 1; i <= _this.days.length; i++) {
                    _this.updateSensitiveData(officeId, _this.getFirstDayOfMonth(i).toLocaleDateString());
                }
            });
        }
    };
    /**
     * 在更换选择科室之后更新数据
     */
    MonthComponent.prototype.onSelectOffice = function (officeName) {
        var _this = this;
        // 更新右侧显示信息
        this.formService.getSensitives(this.selectedForm.id).subscribe(function (sensitives) {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            // 将Json转换成敏感词汇
            _this.sensitives = json_util_1.JsonUtil.parseJsonToSensitive(sensitives);
            // 先获取科室id
            var officeId = json_util_1.JsonUtil.getOfficeId(_this.officeName, _this.offices);
            // 获取每一天的数据，更新界面
            for (var i = 1; i <= _this.days.length; i++) {
                _this.updateSensitiveData(officeId, _this.getFirstDayOfMonth(i).toLocaleDateString());
            }
        });
    };
    /**
     * 更新右侧显示信息
     * @param officeId 科室id
     * @param date 查询日期
     */
    MonthComponent.prototype.updateSensitiveData = function (officeId, date) {
        var _this = this;
        this.monthSensitives = [];
        this.formService.getSensitiveData(officeId, date).subscribe(function (sensitiveJson) {
            console.log('数据：' + sensitiveJson);
            if (sensitiveJson.length > 0) {
                var json = JSON.parse(sensitiveJson);
                // 将读取出来的人数数据显示在界面上
                var sensitiveData = json_util_1.JsonUtil.addPeopleToSensitive(date, json, _this.sensitives);
            }
            else {
                var sensitiveData = json_util_1.JsonUtil.setEmptyPeopleToSensitive(date, _this.sensitives);
            }
            _this.monthSensitives.push(sensitiveData);
            // 因为读取数据是异步的，所以每次添加完数据都要进行排序
            _this.popData();
        });
    };
    /**
     * 将数据按照日期从小到大排序
     */
    MonthComponent.prototype.popData = function () {
        var length = this.monthSensitives.length;
        // 用来记录遍历截止的位置i
        for (var i = 0; i < length - 1; i++) {
            for (var j = 0; j < length - 1 - i; j++) {
                var s1 = this.monthSensitives[j];
                var s2 = this.monthSensitives[j + 1];
                // 交换位置
                if (s1[0].day > s2[0].day) {
                    this.monthSensitives[j] = s2;
                    this.monthSensitives[j + 1] = s1;
                }
            }
        }
    };
    /**
     * 获取某年某月的所有天数
     * @param year
     * @param month
     * @returns {number}
     */
    MonthComponent.prototype.getDaysOfMonth = function (year, month) {
        month--;
        var d = new Date(year, month, 1);
        d.setDate(d.getDate() + 32 - d.getDate());
        return (32 - d.getDate());
    };
    /**
     * 取得当月某一天的日期
     * @param day 1:第一天...
     * @returns {Date}
     */
    MonthComponent.prototype.getFirstDayOfMonth = function (day) {
        var date = new Date();
        date.setDate(day);
        return date;
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