"use strict";
var report_form_1 = require("../entity/report-form");
/**
 * Created by Jerry on 2016/11/23.
 */
var SystemConfig = (function () {
    function SystemConfig() {
    }
    /**
     * 获取登陆用户名
     * @returns {any}
     */
    SystemConfig.getUsername = function () {
        var json = localStorage.getItem('user');
        var username = JSON.parse(json).LoginName;
        return username;
    };
    /**
     * 获取所有上报表信息
     * @returns {any}
     */
    SystemConfig.getReportForms = function () {
        var reportForms = [];
        var json = localStorage.getItem('report_form');
        for (var i = 0; i < JSON.parse(json).length; i++) {
            var rf = new report_form_1.ReportForm();
            rf.id = JSON.parse(json)[i].ReportFormId;
            rf.index = JSON.parse(json)[i].FormIndex;
            rf.name = JSON.parse(json)[i].Name;
            reportForms.push(rf);
        }
        return reportForms;
    };
    return SystemConfig;
}());
exports.SystemConfig = SystemConfig;
//# sourceMappingURL=system.config.js.map