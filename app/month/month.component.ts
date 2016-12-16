import {Component, OnInit} from '@angular/core';

import {ReportService} from '../service/report.service';
import {SystemConfig} from "../util/system.config";
import {ReportForm} from "../entity/report-form";
import {JsonUtil} from "../util/json-util";
import {Office} from "../entity/office";
import {Sensitive} from "../entity/sensitive";

// 每月汇总页面
@Component({
    moduleId: module.id,
    templateUrl: 'month.component.html',
    styleUrls: ['../day/day.component.css', 'month.component.css']
})

export class MonthComponent implements OnInit {
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


    days = [];

    // 当月的敏感词汇集合
    monthSensitives = [];

    constructor(private formService: ReportService) {
    }

    ngOnInit(): void {
        // 初始化所有敏感词汇
        this.initSensitives();
        // 初始化左侧的天数
        this.initIndex();
    }

    /**
     * 初始化所有敏感词汇
     */
    private initSensitives() {
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
     * 初始化左侧的天数
     */
    private initIndex() {
        var year = new Date().getFullYear();
        var month = new Date().getMonth();
        // 获取某年某月的所有天数
        var days = this.getDaysOfMonth(year, month);
        for (var i = 0; i < days; i++) {
            this.days[i] = i + 1;
        }
    }

    // 当选择一个左侧报表的类型
    onSelect(rf: ReportForm): void {
        if (this.selectedForm != rf) {
            this.selectedForm = rf;
            // 读取敏感词汇表结构
            this.formService.getSensitives(rf.id).subscribe(sensitives => {
                console.log('获取JSON内容：' + JSON.stringify(sensitives));
                // 将Json转换成敏感词汇
                this.sensitives = JsonUtil.parseJsonToSensitive(sensitives);
                // 先获取科室id
                var officeId = JsonUtil.getOfficeId(this.officeName, this.offices);
                // 获取每一天的数据，更新界面
                for (var i = 1; i <= this.days.length; i++) {
                    this.updateSensitiveData(officeId, this.getFirstDayOfMonth(i).toLocaleDateString());
                }
            });
        }
    }

    /**
     * 在更换选择科室之后更新数据
     */
    onSelectOffice(officeName: string): void {
        // 更新右侧显示信息
        this.formService.getSensitives(this.selectedForm.id).subscribe(sensitives => {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            // 将Json转换成敏感词汇
            this.sensitives = JsonUtil.parseJsonToSensitive(sensitives);
            // 先获取科室id
            var officeId = JsonUtil.getOfficeId(this.officeName, this.offices);
            // 获取每一天的数据，更新界面
            for (var i = 1; i <= this.days.length; i++) {
                this.updateSensitiveData(officeId, this.getFirstDayOfMonth(i).toLocaleDateString());
            }
        });
    }


    /**
     * 更新右侧显示信息
     * @param officeId 科室id
     * @param date 查询日期
     */
    private updateSensitiveData(officeId: number, date: string) {
        this.monthSensitives = [];
        this.formService.getSensitiveData(officeId, date).subscribe(sensitiveJson => {

            console.log('数据：' + sensitiveJson);
            if (sensitiveJson.length > 0) {
                var json = JSON.parse(sensitiveJson);
                // 将读取出来的人数数据显示在界面上
                var sensitiveData = JsonUtil.addPeopleToSensitive(date, json, this.sensitives);
            } else {
                var sensitiveData = JsonUtil.setEmptyPeopleToSensitive(date, this.sensitives);
            }
            this.monthSensitives.push(sensitiveData);
            // 因为读取数据是异步的，所以每次添加完数据都要进行排序
            this.popData();
        });
    }

    /**
     * 将数据按照日期从小到大排序
     */
    private popData(): void {
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

    }


    /**
     * 获取某年某月的所有天数
     * @param year
     * @param month
     * @returns {number}
     */
    private getDaysOfMonth(year: number, month: number): number {
        month--;
        var d = new Date(year, month, 1);
        d.setDate(d.getDate() + 32 - d.getDate());
        return (32 - d.getDate());
    }

    /**
     * 取得当月某一天的日期
     * @param day 1:第一天...
     * @returns {Date}
     */
    private getFirstDayOfMonth(day: number): Date {
        var date = new Date();
        date.setDate(day);
        return date;
    }
}