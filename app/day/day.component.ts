import {Component, OnInit, Input} from '@angular/core';

import {ReportService} from '../service/report.service';
import {Sensitive} from "../entity/sensitive";
import {SystemConfig} from "../util/system.config";
import {ReportForm} from "../entity/report-form";
import {ElementUtil} from "../util/element-util";
import {JsonUtil} from "../util/json-util";
import {Office} from "../entity/office";
import {isNumber} from "util";


// 每日汇报页面
@Component({
    moduleId: module.id,
    selector: 'thr-day',
    templateUrl: 'day.component.html',
    styleUrls: ['day.component.css']
})
export class DayComponent implements OnInit {

    // 所有上报表
    reportForms: ReportForm[];

    // 当前选择的报表
    selectedForm: ReportForm;

    // 敏感词汇结构
    sensitives = [];

    // 所有科室集合
    offices: Office[] = [];
    // 所选择的科室
    officeName: string;

    // 用来在界面上显示当天的日期
    today: string = new Date().toLocaleDateString();

    constructor(private formService: ReportService) {

    }

    ngOnInit(): void {
        // 读取所有上报表
        this.reportForms = SystemConfig.getReportForms();
        this.formService.getOffices().subscribe(offices => {
            console.log('获取JSON内容：' + JSON.stringify(offices));
            for (var i = 0; i < offices.length; i++) {
                var office = new Office();
                office.id = offices[i].OfficeID;
                office.name = offices[i].OfficeName;
                this.offices.push(office);
            }

            // 初始化默认选择科室
            if (offices.length > 0) {
                this.officeName = offices[0].OfficeName;
            } else {
                this.officeName = '';
            }
        });
    }

    /**
     * 当选择一个左侧报表的类型
     * @param rf
     */
    onSelectForm(rf: ReportForm): void {
        this.selectedForm = rf;
        // 读取敏感词汇表结构
        this.formService.getSensitives(rf.id).subscribe(sensitives => {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            // 将Json转换成敏感词汇
            this.sensitives = JsonUtil.parseJsonToSensitive(sensitives);
            // 先获取科室id
            var officeId = JsonUtil.getOfficeId(this.officeName, this.offices);
            // 更新右侧显示信息
            this.updateSensitiveData(officeId, this.today);
        });
    }

    /**
     * 在更换选择科室之后更新数据
     */
    onSelectOffice(officeName: string): void {
        // 先获取科室id
        var officeId = JsonUtil.getOfficeId(officeName, this.offices);
        // 更新右侧显示信息
        this.updateSensitiveData(officeId, this.today);
    }

    /**
     * 更新右侧显示信息
     * @param officeId 科室id
     * @param date 查询日期
     */
    private updateSensitiveData(officeId: number, date: string) {
        this.formService.getSensitiveData(officeId, date).subscribe(sensitiveData => {
            console.log(sensitiveData);
            var jsonArray = JSON.parse(sensitiveData);
            if (jsonArray.length > 0) {
                // 将读取出来的人数数据显示在界面上
                this.sensitives = JsonUtil.addPeopleToSensitive(jsonArray, this.sensitives);
            } else {
                this.sensitives = JsonUtil.setEmptyPepleToSensitive(this.sensitives);
            }
        });
    }


    /**
     * 限制输入框只能输入正整数
     * @param s
     * @param people
     */
    onlyNumber(s: Sensitive, people) {
        s.people = ElementUtil.makePositiveInteger(people);
    }

    /**
     * 提交表单数据
     */
    onSubmit() {
        // 先获取科室id
        var officeId = JsonUtil.getOfficeId(this.officeName, this.offices);
        this.formService.postSensitiveData(officeId, SystemConfig.getUserId(), this.today, this.sensitives).subscribe(
            data => {
                console.log(JSON.stringify(data));
                alert(JSON.stringify(data));
            },
            error => alert(error),
            () => {
                console.log("Finished");
            }
        );
    }
}