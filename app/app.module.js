"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var day_component_1 = require('./day/day.component');
var month_component_1 = require('./month/month.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./login/register.component');
var report_component_1 = require('./report.component');
var homepage_component_1 = require('./homepage/homepage.component');
var report_service_1 = require('./service/report.service');
var app_routing_module_1 = require('./app-routing.module');
var http_1 = require("@angular/http");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                day_component_1.DayComponent,
                month_component_1.MonthComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                report_component_1.ReportComponent,
                homepage_component_1.HomepageComponent,
                login_component_1.LoginComponent
            ],
            providers: [report_service_1.ReportService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map