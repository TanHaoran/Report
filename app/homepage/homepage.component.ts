import {Component, OnInit} from '@angular/core';
import {User} from "../entity/user";
import {SystemConfig} from "../util/system.config";


// 首页页面
@Component({
    moduleId: module.id,
    selector: 'thr-homepage',
    template: `
		<div>
			<p>Hello ~ {{user.username}}，你好!</p>
			<p>今天是： {{today | date:'fullDate'}}</p>
		</div>
	`,
    styleUrls: ['homepage.component.css']
})

export class HomepageComponent implements OnInit {

    user = new User(0, '', '');
    today: number = Date.now();

    ngOnInit(): void {
        this.user.username = SystemConfig.getUsername();
    }

}

