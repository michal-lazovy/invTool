System.register(["angular2/core", "./settings.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, settings_service_1;
    var SettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            }],
        execute: function() {
            SettingsComponent = (function () {
                function SettingsComponent(_settingsService) {
                    this._settingsService = _settingsService;
                    this.funds = [];
                }
                SettingsComponent.prototype.getSettings = function () {
                    var _this = this;
                    this._settingsService.getFunds().subscribe(function (data) { return _this.funds = data; }, function (error) { return alert(error); });
                };
                SettingsComponent.prototype.ngOnInit = function () {
                    this.getSettings();
                };
                SettingsComponent.prototype.sendFunds = function () {
                    waitingDialog.show();
                    this._settingsService.setFunds(JSON.stringify(this.funds));
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'settings-component',
                        template: "\n        <table>\n            <tr>\n              <td>Name</td>\n              <td>Value</td>\n            </tr>\n          <tr *ngFor=\"#fund of funds\">\n            <td>{{ fund.name }}</td>\n            <td><input type=\"text\" [(ngModel)]=\"fund.portfolio\"></td>\n          </tr>\n        </table>\n        <button (click)=\"sendFunds()\">Save</button>\n    ",
                        providers: [settings_service_1.SettingsService]
                    }), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService])
                ], SettingsComponent);
                return SettingsComponent;
            }());
            exports_1("SettingsComponent", SettingsComponent);
        }
    }
});
//# sourceMappingURL=settings.component.js.map