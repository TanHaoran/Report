import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DayComponent } from './day.component';
import { MonthComponent } from './month.component';

// 路由类
const routes: Routes = [
	{ path: '', redirectTo: '/day', pathMatch: 'full' },
	{ path: 'day', component: DayComponent },
	{ path: 'month', component: MonthComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})


export class AppRoutingModule {}