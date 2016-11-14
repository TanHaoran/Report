import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { ReportComponent } from './report.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

// 路由类
const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ 
		path: 'report', 
		component: ReportComponent,
		children: [
		{
			path: '',
			redirectTo: '/report/homepage',
			pathMatch: 'full' 
		},
		{
			path: 'homepage',
			component: HomepageComponent
		},
		{
			path: 'day',
			component: DayComponent
		},
		{
			path: 'month',
			component: MonthComponent
		}]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})


export class AppRoutingModule {}