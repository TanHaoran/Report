import {Component, OnInit} from '@angular/core';
import {User} from "./entity/user";
import {SystemConfig} from "./util/system.config";
import {ReportService} from "./service/report.service";
import {ReportForm} from "./entity/report-form";


// 首页页面
@Component({
    moduleId: module.id,
    selector: 'thr-report',
    templateUrl: 'report.component.html',
    styleUrls: ['app.component.css', 'report.component.css']
})

export class ReportComponent implements OnInit {

    user: User = new User(0, '', '');

    constructor(private reportService: ReportService) {

    }

    ngOnInit(): void {
        this.user = new User(0, '', '');
        this.user.username = SystemConfig.getUsername();

        // 读取所有表结构
        this.reportService.getReportForm().subscribe(reportForms => {
            console.log('获取JSON内容：' + JSON.stringify(reportForms));
            localStorage.setItem('report_form', JSON.stringify(reportForms));
        });
    }
}

