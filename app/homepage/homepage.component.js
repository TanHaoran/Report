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
var user_1 = require("../entity/user");
var system_config_1 = require("../util/system.config");
// 首页页面
var HomepageComponent = (function () {
    function HomepageComponent() {
        this.user = new user_1.User(0, '', '');
        this.today = Date.now();
    }
    HomepageComponent.prototype.ngOnInit = function () {
        this.user.username = system_config_1.SystemConfig.getUsername();
    };
    HomepageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thr-homepage',
            template: "\n\t\t<div>\n\t\t\t<p>Hello ~ {{user.username}}\uFF0C\u4F60\u597D!</p>\n\t\t\t<p>\u4ECA\u5929\u662F\uFF1A {{today | date:'fullDate'}}</p>\n\t\t</div>\n\t",
            styleUrls: ['homepage.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], HomepageComponent);
    return HomepageComponent;
}());
exports.HomepageComponent = HomepageComponent;
//# sourceMappingURL=homepage.component.js.map