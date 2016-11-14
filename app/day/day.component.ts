import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Form } from '../entity/form';
import { FormService } from '../service/form.service';


// 每日汇报页面
@Component({
	moduleId: module.id,
	selector: 'thr-day',
	templateUrl: 'day.component.html',
	styleUrls: [ 'day.component.css']
})

export class DayComponent implements OnInit { 
	
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

