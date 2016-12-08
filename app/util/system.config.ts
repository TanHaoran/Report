import {ReportForm} from "../entity/report-form";
/**
 * Created by Jerry on 2016/11/23.
 */


export class SystemConfig {

    /**
     * 获取登陆用户名
     * @returns {any}
     */
    static getUsername(): string {
        var json = localStorage.getItem('user');
        var username = JSON.parse(json).LoginName;
        return username;
    }

    /**
     * 获取登陆用户id
     * @returns {any}
     */
    static getUserId(): string {
        var json = localStorage.getItem('user');
        var userId = JSON.parse(json).OperatorID;
        return userId;
    }

    /**
     * 获取所有上报表信息
     * @returns {any}
     */
    static getReportForms(): ReportForm[] {
        var reportForms  = [];
        var json = localStorage.getItem('report_form');
        for (var i = 0; i < JSON.parse(json).length; i++) {
            var rf = new ReportForm();
            rf.id = JSON.parse(json)[i].ReportFormId;
            rf.index = JSON.parse(json)[i].FormIndex;
            rf.name = JSON.parse(json)[i].Name;
            reportForms.push(rf);
        }
        return reportForms;
    }
}