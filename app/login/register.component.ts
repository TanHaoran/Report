import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {User}    from '../entity/User';
import {FormService} from "../service/form.service";


// 登陆页面
@Component({
    moduleId: module.id,
    selector: 'thr-login',
    templateUrl: 'register.component.html',
    styleUrls: ['login.component.css']
})

export class RegisterComponent implements OnInit {


    model = new User(0, '', '', '');
    officeNames = ['神经1病区', '神经2病区', '儿科1病区', '儿科2病区'];

    constructor(private router: Router, private formService: FormService) {

    }


    ngOnInit(): void {
        this.formService.getOffice().subscribe(offices => {
            console.log('获取JSON内容：' + JSON.stringify(offices));
            for (var i = 0; i < offices.length; i++) {
                this.officeNames[i] = offices[i].OfficeName;
            }
        });
    }

    // 注册
    onSubmit() {
        this.router.navigateByUrl('/login');
    }
}