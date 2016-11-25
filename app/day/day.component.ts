import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {ReportService} from '../service/report.service';
import {Sensitive} from "../entity/sensitive";
import {SystemConfig} from "../util/system.config";
import {ReportForm} from "../entity/report-form";


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
            this.sensitives = this.parseJsonToSensitive(sensitives);
        });
    }

    /**
     * 将Json转换成敏感词汇
     * @param sensitives 敏感词汇json字串
     */
    private parseJsonToSensitive(sensitives): Sensitive[] {
        // 最终要返回的结果集合
        var sensitiveArray = new Array<Sensitive>();

        for (var i = 0; i < sensitives.length; i++) {
            // 从json中取出每一个属性
            var sensitiveId = sensitives[i].SensitiveId;
            var name = sensitives[i].Name;
            var parentName = sensitives[i].ParentName;
            var hasChildren = sensitives[i].HasChildren;
            var reportFormId = sensitives[i].ReportFormId;

            // 构建敏感词
            var s = new Sensitive();
            s.sensitiveId = sensitiveId;
            s.name = name;
            s.parentName = parentName;
            s.hasChildren = hasChildren;
            s.reportFormId = reportFormId;

            // 如果是不是父级就直接添加进去，如果是父级就跳过
            if (!hasChildren) {
                sensitiveArray.push(s);
            }
        }
        return sensitiveArray;
    }
}

