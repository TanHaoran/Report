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
var mock_form_1 = require('./mock-form');
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
// 数据服务
var ReportService = (function () {
    function ReportService(http) {
        this.http = http;
        this.loginUrl = 'http://192.168.0.231:3002/login/';
        this.getOfficesUrl = 'http://localhost:3002/getOffices';
        this.getReportFormsUrl = 'http://localhost:3002/getReportForms';
        this.getSensitivesUrl = 'http://localhost:3002/getSensitives/';
    }
    // 获取所有表单结构数据
    ReportService.prototype.getForms = function () {
        return Promise.resolve(mock_form_1.FORMS);
    };
    /**
     * 发送用户名和密码到服务端验证登陆
     * @param username 用户名
     * @param password 密码
     * @returns {Observable<R>}
     */
    ReportService.prototype.getUser = function (username, password) {
        var url = this.loginUrl + username + "/" + password;
        console.log("请求地址：" + url);
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    /**
     * 获取所有科室信息
     * @returns {Observable<R>}
     */
    ReportService.prototype.getOffices = function () {
        console.log("请求地址：" + this.getOfficesUrl);
        return this.http.get(this.getOfficesUrl).map(function (res) { return res.json(); });
    };
    /**
     * 获取所有上报表信息
     * @returns {Observable<R>}
     */
    ReportService.prototype.getReportForm = function () {
        console.log("请求地址：" + this.getReportFormsUrl);
        return this.http.get(this.getReportFormsUrl).map(function (res) { return res.json(); });
    };
    /**
     * 获取敏感词汇信息
     * @returns {Observable<R>}
     */
    ReportService.prototype.getSensitives = function (reportFormId) {
        var url = this.getSensitivesUrl + reportFormId;
        console.log("请求地址：" + url);
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ReportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReportService);
    return ReportService;
}());
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map