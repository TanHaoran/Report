import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DayComponent } from './day.component';
import { MonthComponent } from './month.component';
import { HomepageComponent } from './homepage.component';

// 路由类
const routes: Routes = [
	{ path: '', redirectTo: '/homepage', pathMatch: 'full' },
	{ path: 'day', component: DayComponent },
	{ path: 'month', component: MonthComponent },
	{ path: 'homepage', component: HomepageComponent}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})


export class AppRoutingModule {}