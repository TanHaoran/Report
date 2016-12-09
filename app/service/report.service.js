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
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
// 数据服务
var ReportService = (function () {
    function ReportService(http) {
        this.http = http;
        /**
         * 服务IP地址
         * @type {string}
         */
        this.serviceIp = 'http://192.168.0.226';
        /**
         * 服务端口号码
         * @type {string}
         */
        this.servicePort = ':3002';
        /**
         * 登陆(post请求)
         * @type {string}
         */
        this.loginUrl = this.serviceIp + this.servicePort + '/login';
        /**
         * 获取所有科室(get请求)
         * @type {string}
         */
        this.getOfficesUrl = this.serviceIp + this.servicePort + '/getOffices';
        /**
         * 注册(post请求)
         * @type {string}
         */
        this.registerUrl = this.serviceIp + this.servicePort + '/register';
        /**
         * 获取所有上报表单(get请求)
         * @type {string}
         */
        this.getReportFormsUrl = this.serviceIp + this.servicePort + '/getReportForms';
        /**
         * 获取敏感词汇(get请求)
         * @type {string}
         */
        this.getSensitivesUrl = this.serviceIp + this.servicePort + '/getSensitives/';
        /**
         * 获取已保存的记录
         * @type {string}
         */
        this.getFormDataUrl = this.serviceIp + this.servicePort + '/getFormData/';
        /**
         * 提交敏感词汇上报表(post请求)
         * @type {string}
         */
        this.postFormData = this.serviceIp + this.servicePort + '/postFormData';
    }
    /**
     * 发送用户名和密码到服务端验证登陆
     * @param username 用户名
     * @param password 密码
     * @returns {Observable<R>}
     */
    ReportService.prototype.postUser = function (username, password) {
        var url = this.loginUrl;
        console.log("请求地址：" + url);
        var json = JSON.stringify({ 'username': username, 'password': password });
        var params = 'data=' + json;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, params, {
            headers: headers
        }).map(function (res) { return res.json(); });
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
     * 用户进行注册
     * @param username
     * @param password
     * @param officeName
     */
    ReportService.prototype.postRegister = function (username, password) {
        var url = this.registerUrl;
        console.log("请求地址：" + url);
        // 拼凑json字串
        var json = JSON.stringify({
            'username': username,
            'password': password
        });
        var params = 'data=' + json;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, params, {
            headers: headers
        }).map(function (res) { return res.json(); });
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
    /**
     * 获取已保存的记录
     * @param officeId 科室id
     * @param date 上报日期
     * @returns {Observable<R>}
     */
    ReportService.prototype.getSensitiveData = function (officeId, date) {
        // 替换斜杠为连词符
        date = date.split('/').join('-');
        var url = this.getFormDataUrl + officeId + "/" + date;
        console.log("请求地址：" + url);
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    /**
     * 提交敏感词汇表
     * @param officeId 上报科室
     * @param operatorId 上报人员
     * @param sensitives 数据内容
     * @returns {Observable<R>}
     */
    ReportService.prototype.postSensitiveData = function (officeId, operatorId, date, sensitives) {
        var json = JSON.stringify(sensitives);
        var params = 'officeId=' + officeId + '&operatorId=' + operatorId + '&date=' + date + '&data=' + json;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.postFormData, params, {
            headers: headers
        }).map(function (res) { return res.json(); });
    };
    ReportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReportService);
    return ReportService;
}());
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map