import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {Form} from '../entity/form';
import {FormService} from '../service/form.service';
import {Sensitive} from "../entity/sensitive";


// 每日汇报页面
@Component({
    moduleId: module.id,
    selector: 'thr-day',
    templateUrl: 'day.component.html',
    styleUrls: ['day.component.css']
})
export class DayComponent implements OnInit {

    // 所有报表
    forms: Form[];

    // 当前选择的报表
    selectedForm: Form;

    // 敏感词汇结构
    sensitives: Sensitive[] = [];

    constructor(private router: Router, private formService: FormService) {
    }

    ngOnInit(): void {
        // 初始化所有报表
        this.formService.getForms().then(forms => this.forms = forms);
        // 读取敏感词汇表结构
        this.formService.getSensitives().subscribe(sensitives => {
            console.log('获取JSON内容：' + JSON.stringify(sensitives));
            for (var i = 0; i < sensitives.length; i++) {
                var s = new Sensitive();
                s.sensitiveId = sensitives[i].SensitiveId;
                s.name = sensitives[i].Name;
                s.parentId = sensitives[i].ParentId;
                s.grade = sensitives[i].Grade;
                sensitives[i] = s;
            }
        });
    }

    // 当选择一个左侧报表的类型
    onSelect(form: Form): void {
        this.selectedForm = form;
    }
}

