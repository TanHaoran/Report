import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


import { Form } from './form';
import { FormService } from './form.service';

@Component({
	moduleId: module.id,
	selector: 'thr-day',
	templateUrl: 'day.component.html',
	styleUrls: [ 'day.component.css']
})

// 每日汇报页面
export class DayComponent implements OnInit { 
	
	// 所有报表
	forms: Form[];

	// 当前选择的报表
	selectedForm: Form;


	constructor(
		private router: Router,
		private formService: FormService) { }

	ngOnInit(): void {
		this.formService.getForms()
		.then(forms => this.forms = forms);
	}

	// 当选择一个左侧的类型
	onSelect(form: Form): void {
		this.selectedForm = form;
	}
}

