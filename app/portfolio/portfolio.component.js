System.register(["angular2/core", '../../node_modules/angular2-google-chart/directives/angular2-google-chart.directive.ts', "./portfolio.service"], function(exports_1, context_1) {
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
    var core_1, angular2_google_chart_directive_ts_1, portfolio_service_1;
    var PortfolioComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_google_chart_directive_ts_1_1) {
                angular2_google_chart_directive_ts_1 = angular2_google_chart_directive_ts_1_1;
            },
            function (portfolio_service_1_1) {
                portfolio_service_1 = portfolio_service_1_1;
            }],
        execute: function() {
            PortfolioComponent = (function () {
                function PortfolioComponent(_portfolioService) {
                    this._portfolioService = _portfolioService;
                    this.portfolio = [];
                    this.portfolioValue = 0;
                    this.date = new Date();
                    this.date.setMonth(this.date.getMonth() - 1);
                }
                PortfolioComponent.prototype.selectInterval = function (type) {
                    var subtract = 86400000;
                    switch (type) {
                        case 1:
                            this.date = new Date(new Date().getTime() - 86400000 * 7);
                            break;
                        case 2:
                            this.date = new Date();
                            this.date.setMonth(this.date.getMonth() - 1);
                            break;
                        case 3:
                            this.date = new Date();
                            this.date.setFullYear(this.date.getFullYear() - 1);
                            break;
                        case 4:
                            this.date = null;
                    }
                    this.showLineChartFor(this.selectedIndex);
                };
                PortfolioComponent.prototype.getPortfolio = function () {
                    var _this = this;
                    waitingDialog.show();
                    this._portfolioService.getPortfolio().subscribe(function (data) { return _this.drawGraph(data); }, function (error) { return alert(error); });
                };
                PortfolioComponent.prototype.getPortfolioValues = function () {
                    var _this = this;
                    this._portfolioService.getPortfolioValues().subscribe(function (data) { return _this.showPortfolioChart(data); }, function (error) { return alert(error); });
                };
                PortfolioComponent.prototype.drawGraph = function (portfolioData) {
                    this.portfolio = portfolioData;
                    this.portfolioValue = +(this.getPortfolioValue()).toFixed(2);
                    var dataArray = [];
                    var i = 1;
                    dataArray[0] = ['Task', 'Hours per Day'];
                    for (var _i = 0, _a = this.portfolio; _i < _a.length; _i++) {
                        var p = _a[_i];
                        dataArray[i++] = [p.name, +(+p.portfolio * +p.FundValues[0].value).toFixed(2)];
                    }
                    console.log(dataArray);
                    this.data = google.visualization.arrayToDataTable(dataArray);
                    this.options = {
                        title: 'Portfolio',
                        pieSliceText: 'value'
                    };
                    var portfolioPieElement = document.getElementById('portfolio_pie');
                    this.portfolioPieChart = new google.visualization.PieChart(portfolioPieElement);
                    this.portfolioPieChart.draw(this.data, this.options);
                    // this.getPortfolioValues();
                    var aux = [
                        ['Date', 'Value']
                    ];
                    var counter = 1;
                    for (var i_1 = this.portfolio[0].FundValues.length - 1; i_1 >= 0; i_1--) {
                        var sum = 0;
                        var auxDate = void 0;
                        var isConsistent = true;
                        for (var _b = 0, _c = this.portfolio; _b < _c.length; _b++) {
                            var p = _c[_b];
                            if (p.FundValues[i_1] == undefined) {
                                isConsistent = false;
                                break;
                            }
                            auxDate = p.FundValues[i_1].valueDate;
                            sum += +p.FundValues[i_1].value * p.portfolio;
                        }
                        if (!isConsistent) {
                            continue;
                        }
                        aux[counter++] = [auxDate, +(sum).toFixed(2)];
                    }
                    this.showPortfolioChart(aux);
                };
                PortfolioComponent.prototype.showPortfolioChart = function (data) {
                    waitingDialog.hide();
                    var options = {
                        title: 'Portfolio value',
                        curveType: 'function',
                        legend: { position: 'bottom' }
                    };
                    var chart = new google.visualization.LineChart(document.getElementById('portfolio_chart_placeholder'));
                    chart.draw(google.visualization.arrayToDataTable(data), options);
                };
                PortfolioComponent.prototype.ngOnInit = function () {
                    this.getPortfolio();
                };
                PortfolioComponent.prototype.showLineChartFor = function (index) {
                    this.selectedIndex = index;
                    var dataArray = [];
                    dataArray[0] = ['Date', 'Value'];
                    var auxArray = [];
                    var i = 0;
                    for (var _i = 0, _a = this.portfolio[index].FundValues; _i < _a.length; _i++) {
                        var fv = _a[_i];
                        var date = new Date(fv.valueDate);
                        if (this.date != null && this.date > date) {
                            break;
                        }
                        auxArray[i++] = [fv.valueDate, +fv.value];
                    }
                    i = 1;
                    for (var len = auxArray.length - 1; len >= 0; len--) {
                        dataArray[i++] = auxArray[len];
                    }
                    var options = {
                        title: this.portfolio[index].name,
                        curveType: 'function',
                        legend: { position: 'bottom' }
                    };
                    var chart = new google.visualization.LineChart(document.getElementById('fund_line_chart'));
                    chart.draw(google.visualization.arrayToDataTable(dataArray), options);
                };
                PortfolioComponent.prototype.getPortfolioValue = function () {
                    var sum = 0;
                    for (var _i = 0, _a = this.portfolio; _i < _a.length; _i++) {
                        var fund = _a[_i];
                        sum += +fund.portfolio * +fund.FundValues[0].value;
                    }
                    return sum;
                };
                PortfolioComponent = __decorate([
                    core_1.Component({
                        selector: 'portfolio-component',
                        directives: [angular2_google_chart_directive_ts_1.GoogleChart],
                        providers: [portfolio_service_1.PortfolioService],
                        template: "\n      <div style=\"width:100%;\">\n        <div id=\"actual_portfolio_value\">Actual portfolio value: {{portfolioValue}}</div>\n        <div id=\"portfolio_pie\" ></div>\n        <div id=\"portfolio_chart\">\n          <div id=\"portfolio_chart_placeholder\" style=\"height: 500px;\"></div>\n        </div>\n        <div id=\"lineChart\">\n          <div *ngFor=\"#f of portfolio;#i=index\">\n            <a (click)=\"showLineChartFor(i)\">{{f.name}}</a>\n          </div>\n          <div id=\"fund_line_chart\" style=\"height: 500px;\"></div>\n          <div *ngIf=\"selectedIndex != null\" style=\"text-align:center;margin-bottom:50px;\">\n          <button (click)=\"selectInterval(1)\" class=\"btn btn-primary my-button\">Week</button><button (click)=\"selectInterval(2)\" class=\"btn btn-primary my-button\">Month</button><button (click)=\"selectInterval(3)\" class=\"btn btn-primary my-button\">Year</button><button (click)=\"selectInterval(4)\" class=\"my-button btn btn-primary\">All</button>\n          </div>\n        </div>\n      </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [portfolio_service_1.PortfolioService])
                ], PortfolioComponent);
                return PortfolioComponent;
            }());
            exports_1("PortfolioComponent", PortfolioComponent);
        }
    }
});
//# sourceMappingURL=portfolio.component.js.map