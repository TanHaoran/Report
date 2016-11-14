import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { User }    from '../entity/User';


// 登陆页面
@Component({
	moduleId: module.id,
	selector: 'thr-login',
	templateUrl: 'login.component.html',
	styleUrls: [ 'login.component.css']
})

export class LoginComponent {

	active = true;

	model = new User(0, '', '', '');

	submitted = false;


	constructor(
		private router: Router
		) {

	}

	// 登录
	onSubmit() {
		this.submitted = true; 
		this.router.navigateByUrl('/report');
	}

	
	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.model); }

}