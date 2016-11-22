import {Component} from '@angular/core';

import {Router} from '@angular/router';

import {User}    from '../entity/User';
import {FormService} from "../service/form.service";

// 登陆页面
@Component({
    moduleId: module.id,
    selector: 'thr-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {


    active = true;
    submitted = false;

    model = new User(0, '', '', '');


    constructor(private router: Router, private formService: FormService) {
    }


    // 登录
    onSubmit() {
        this.submitted = true;
        this.router.navigateByUrl('/report');
    }

    onLogin(): void {
        this.formService.getUser().subscribe(
            user => {
                console.log(user.UserId);
            });
    }

}