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
var router_1 = require('@angular/router');
var form_service_1 = require('../service/form.service');
// 每日汇报页面
var DayComponent = (function () {
    function DayComponent(router, formService) {
        this.router = router;
        this.formService = formService;
    }
    DayComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 初始化所有报表
        this.formService.getForms()
            .then(function (forms) { return _this.forms = forms; });
    };
    // 当选择一个左侧报表的类型
    DayComponent.prototype.onSelect = function (form) {
        this.selectedForm = form;
    };
    DayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thr-day',
            templateUrl: 'day.component.html',
            styleUrls: ['day.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, form_service_1.FormService])
    ], DayComponent);
    return DayComponent;
}());
exports.DayComponent = DayComponent;
//# sourceMappingURL=day.component.js.map