import {Component, OnInit} from '@angular/core';
import {User} from "./entity/user";
import {SystemConfig} from "./util/system.config";


// 首页页面
@Component({
    moduleId: module.id,
    selector: 'thr-report',
    templateUrl: 'report.component.html',
    styleUrls: ['app.component.css', 'report.component.css']
})

export class ReportComponent implements OnInit {

    user: User = new User(0, '', '', '');

    ngOnInit(): void {
        this.user = new User(0, '', '', '');
        this.user.username = SystemConfig.getUsername();
    }
}

