import {Component, OnInit, Input} from '@angular/core';

import {Router} from '@angular/router';

import {ReportService} from '../service/report.service';
import {Sensitive} from "../entity/sensitive";
import {SystemConfig} from "../util/system.config";
import {ReportForm} from "../entity/report-form";
import {ElementUtil} from "../util/element-util";
import {JsonUtil} from "../util/json-util";


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

    constructor(private router: Router, private formService: ReportService) {

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
        this.formService.postSensitives(this.sensitives).subscribe(
            data => console.log(JSON.stringify(data)),
            error => alert(error),
            () => console.log("Finished")
        );
    }


}

