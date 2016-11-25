import {Component} from '@angular/core';

import {Router} from '@angular/router';

import {User}    from '../entity/User';
import {ReportService} from "../service/report.service";

// 登陆页面
@Component({
    moduleId: module.id,
    selector: 'thr-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {

    model = new User(0, '', '', '');


    constructor(private router: Router, private formService: ReportService) {
    }


    // 登录
    onSubmit() {
        this.formService.getUser(this.model.username, this.model.password).subscribe(user => {
            console.log('获取JSON内容：' + JSON.stringify(user));
            if (user[0] && user[0].LoginName == this.model.username) {
                localStorage.setItem('user', JSON.stringify(user[0]));
                this.router.navigateByUrl('/report');
            } else {
                alert("用户或密码错误！");
            }

        });
    }
}