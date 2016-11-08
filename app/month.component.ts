import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Form } from './form';
import { FormService } from './form.service';

// 每月汇总页面
@Component({
	moduleId: module.id,
	templateUrl: 'month.component.html',
	styleUrls: [ 
		'day.component.css',
		'month.component.css'
	]
})

export class MonthComponent {
	// 所有报表
	forms: Form[];

	// 当前选择的报表
	selectedForm: Form;

	constructor(
		private router: Router,
		private formService: FormService) { }

	ngOnInit(): void {
		// 初始化所有报表
		this.formService.getForms()
		.then(forms => this.forms = forms);
	}

	// 当选择一个左侧报表的类型
	onSelect(form: Form): void {
		this.selectedForm = form;
	}
}