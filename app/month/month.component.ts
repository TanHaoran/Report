import {Component, OnInit} from '@angular/core';

import {ReportService} from '../service/report.service';
import {SystemConfig} from "../util/system.config";
import {ReportForm} from "../entity/report-form";
import {JsonUtil} from "../util/json-util";

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

    constructor(private formService: ReportService) {
    }

    ngOnInit(): void {
        // 读取所有上报表
        this.reportForms = SystemConfig.getReportForms();
    }

    // 当选择一个左侧报表的类型
    onSelect(rf: ReportForm): void {
        this.selectedForm = rf;
        // 读取敏感词汇表结构
        this.formService.getSensitives(rf.id).subscribe(sensitives => {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            // 将Json转换成敏感词汇
            this.sensitives = JsonUtil.parseJsonToSensitive(sensitives);
        });
    }
}