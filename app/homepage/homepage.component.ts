import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Form } from '../entity/form';
import { FormService } from '../service/form.service';


// 首页页面
@Component({
	moduleId: module.id,
	selector: 'thr-homepage',
	template: `
		<div>
			<p>Hello ~ !</p>
			<p>今天是： {{today | date:'fullDate'}}</p>
		</div>
	`
})

export class HomepageComponent { 

	today: number = Date.now();	
}

