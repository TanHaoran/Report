import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {User}    from '../entity/User';
import {ReportService} from "../service/report.service";


// 登陆页面
@Component({
    moduleId: module.id,
    selector: 'thr-login',
    templateUrl: 'register.component.html',
    styleUrls: ['login.component.css']
})

export class RegisterComponent {

    model = new User(0, '', '');

    constructor(private router: Router, private formService: ReportService) {

    }

    // 注册
    onSubmit() {
        this.formService.postRegister(this.model.username, this.model.password).subscribe(data => {
            console.log('获取JSON内容：' + data);
            alert(data);
            if (data == '注册成功') {
                this.router.navigateByUrl('/login');
            }
        });
    }
}