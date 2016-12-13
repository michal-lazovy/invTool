System.register(['angular2/core', "angular2/http", 'rxjs/operator/map', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var PortfolioService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            PortfolioService = (function () {
                function PortfolioService(_http) {
                    this._http = _http;
                }
                PortfolioService.prototype.getPortfolio = function () {
                    return this._http.get('http://127.0.0.1/ws/service/portfolio.php').map(function (responseData) {
                        return responseData.json();
                    });
                };
                PortfolioService.prototype.getPortfolioValues = function () {
                    return this._http.get('http://127.0.0.1/ws/service/portfolioValue.php').map(function (responseData) {
                        return responseData.json();
                    });
                };
                PortfolioService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PortfolioService);
                return PortfolioService;
            }());
            exports_1("PortfolioService", PortfolioService);
        }
    }
});
//# sourceMappingURL=portfolio.service.js.map