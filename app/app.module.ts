import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';

import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ReportComponent } from './report.component';
import { HomepageComponent } from './homepage/homepage.component';


import { FormService }   from './service/form.service';

import { AppRoutingModule }  from './app-routing.module';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	declarations: [ 
		AppComponent,
		DayComponent,
		MonthComponent,
		LoginComponent,
		RegisterComponent,
		ReportComponent,
		HomepageComponent,
		LoginComponent
	],
	providers: [ FormService ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }