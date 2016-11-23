import {Component} from '@angular/core';

// app外层壳
@Component({
	moduleId: module.id,
	selector: 'my-app',
	template: '<router-outlet></router-outlet>'
})

export class AppComponent {
}