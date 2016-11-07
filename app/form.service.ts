import { Injectable } from '@angular/core';

import { Form } from './form';
import { FORMS } from './mock-form';

// 英雄服务
@Injectable() 
export class FormService {
	
	// 获取所有表单结构数据
	getForms(): Promise<Form[]> {
		return Promise.resolve(FORMS);
	}
}
