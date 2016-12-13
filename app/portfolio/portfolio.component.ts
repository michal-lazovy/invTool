import {Component, View} from "angular2/core";
import {OnInit} from "angular2/core";
import {GoogleChart} from '../../node_modules/angular2-google-chart/directives/angular2-google-chart.directive.ts';
import {PortfolioService} from "./portfolio.service";
import {Fund} from "../fuds/fund";

declare var google:any;
@Component({
    selector: 'portfolio-component',
    directives: [GoogleChart],
    providers: [ PortfolioService ],
    template: `
      <div style="width:100%;">
        <div id="actual_portfolio_value">Actual portfolio value: {{portfolioValue}}</div>
        <div id="portfolio_pie" ></div>
        <div id="portfolio_chart">
          <div id="portfolio_chart_placeholder" style="height: 500px;"></div>
        </div>
        <div id="lineChart">
          <div *ngFor="#f of portfolio;#i=index">
            <a (click)="showLineChartFor(i)">{{f.name}}</a>
          </div>
          <div id="fund_line_chart" style="height: 500px;"></div>
          <div *ngIf="selectedIndex != null" style="text-align:center;margin-bottom:50px;">
          <button (click)="selectInterval(1)" class="btn btn-primary my-button">Week</button><button (click)="selectInterval(2)" class="btn btn-primary my-button">Month</button><button (click)="selectInterval(3)" class="btn btn-primary my-button">Year</button><button (click)="selectInterval(4)" class="my-button btn btn-primary">All</button>
          </div>
        </div>
      </div>
    `
})
export class PortfolioComponent implements OnInit {
  private static googleLoaded:any;
  private options;
  private data;
  private portfolioPieChart;
  private date : Date;
  private selectedIndex : number;
  private portfolioValue : number;

  portfolio : Fund[] = [];

  constructor(private _portfolioService : PortfolioService) {
    this.portfolioValue = 0;
    this.date = new Date();
    this.date.setMonth(this.date.getMonth()-1);
  }

  selectInterval(type) {
    let subtract = 86400000;
    switch(type) {
      case 1 :
        this.date = new Date(new Date().getTime() - 86400000*7);
        break;
      case 2:
        this.date = new Date();
        this.date.setMonth(this.date.getMonth()-1);
        break;
      case 3:
        this.date = new Date();
        this.date.setFullYear(this.date.getFullYear()-1);
        break;
      case 4:
        this.date = null;
    }
    this.showLineChartFor(this.selectedIndex);
  }

  getPortfolio() {
    waitingDialog.show();
    this._portfolioService.getPortfolio().subscribe(
      data => this.drawGraph(data),
      error => alert(error)
    );
  }

  getPortfolioValues() {
    this._portfolioService.getPortfolioValues().subscribe(
        data => this.showPortfolioChart(data),
        error => alert(error)
    );
  }

  drawGraph(portfolioData){
    this.portfolio = portfolioData;

    this.portfolioValue = +(this.getPortfolioValue()).toFixed(2);

    let dataArray = [];
    let i = 1;
    dataArray[0] = ['Task', 'Hours per Day'];
    for(let p of this.portfolio) {
      dataArray[i++] = [p.name, +(+p.portfolio * +p.FundValues[0].value).toFixed(2)];
    }
    console.log(dataArray);

    this.data = google.visualization.arrayToDataTable(dataArray);

    this.options = {
          title: 'Portfolio',
          pieSliceText: 'value'
        };

    let portfolioPieElement = document.getElementById('portfolio_pie')
    this.portfolioPieChart = new google.visualization.PieChart(portfolioPieElement);
    this.portfolioPieChart.draw(this.data, this.options);
    // this.getPortfolioValues();

    let aux = [
      ['Date', 'Value']
    ];
    let counter = 1;

    for(let i=this.portfolio[0].FundValues.length-1; i >= 0; i--) {
      let sum = 0;
      let auxDate;
      let isConsistent = true;
      for(let p of this.portfolio ) {
        if(p.FundValues[i] == undefined) {
          isConsistent = false;
          break;
        }
        auxDate = p.FundValues[i].valueDate;
        sum += +p.FundValues[i].value * p.portfolio;
      }
      if(!isConsistent) {
        continue;
      }
      aux[counter++] = [auxDate, +(sum).toFixed(2)];
    }
    this.showPortfolioChart(aux);
  }

  showPortfolioChart(data) {
    waitingDialog.hide();
    var options = {
        title: 'Portfolio value',
        curveType: 'function',
        legend: { position: 'bottom' }
      };
      var chart = new google.visualization.LineChart(document.getElementById('portfolio_chart_placeholder'));
      chart.draw(google.visualization.arrayToDataTable(data), options);
  }

  ngOnInit():any {
    this.getPortfolio();
  }

  showLineChartFor(index) {
    this.selectedIndex = index;
    let dataArray = [];
    dataArray[0] = ['Date', 'Value'];

    let auxArray = [];
    let i=0;
    for(let fv of this.portfolio[index].FundValues) {
      let date = new Date(fv.valueDate);
      if(this.date != null && this.date > date) {
        break;
      }
      auxArray[i++] = [fv.valueDate, +fv.value];
    }
    i=1;
    for(let len = auxArray.length-1; len >= 0; len--) {
      dataArray[i++] = auxArray[len];
    }
    var options = {
        title: this.portfolio[index].name,
        curveType: 'function',
        legend: { position: 'bottom' }
      };
      var chart = new google.visualization.LineChart(document.getElementById('fund_line_chart'));
      chart.draw(google.visualization.arrayToDataTable(dataArray), options);
  }

  getPortfolioValue() {
    let sum = 0;
    for(let fund of this.portfolio) {
      sum += +fund.portfolio * +fund.FundValues[0].value;
    }
    return sum;
  }
}
