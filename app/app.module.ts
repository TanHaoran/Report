import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';


import { AppComponent }   from './app.component';
import { DayComponent }   from './day.component';
import { MonthComponent }   from './month.component';

import { FormService }   from './form.service';

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
		MonthComponent
	],
	providers: [ FormService ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }