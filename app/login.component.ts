import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { User }    from './User';

// 登陆页面
@Component({
	moduleId: module.id,
	selector: 'thr-login',
	templateUrl: 'login.component.html',
	styleUrls: [ 'login.component.css']
})

export class LoginComponent {
	model = new User(1, 'Jerry', '123', '神经内科');
	submitted = false;

	constructor(
		private router: Router
		) {

	}

	onSubmit() { this.submitted = true; }
	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.model); }

	login(): void {
		this.router.navigateByUrl('/day');
	}
}