import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { User }    from '../entity/User';


// 登陆页面
@Component({
	moduleId: module.id,
	selector: 'thr-login',
	templateUrl: 'register.component.html',
	styleUrls: [ 'login.component.css']
})

export class RegisterComponent {
	
	active = true;
	submitted = false;


	model = new User(0, '', '', '');
	offices = ['神经1病区'，'神经2病区', '儿科1病区', '儿科2病区'];

	constructor(
		private router: Router
		) {

	}

	// 注册
	onSubmit() {
		this.submitted = true; 
		this.router.navigateByUrl('/login');
	}
}