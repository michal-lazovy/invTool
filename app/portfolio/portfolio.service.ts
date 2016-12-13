import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Response} from "angular2/http";
import {Observable} from  'rxjs/Observable';
import myGlobals = require('./../../globals.ts');

import 'rxjs/operator/map';
import 'rxjs/Rx';


@Injectable()
export class PortfolioService {
  constructor (private _http: Http) {}

  getPortfolio() {
    return this._http.get('http://'+ myGlobals.srv +'/ws/service/portfolio.php').map((responseData) => {
        return responseData.json();
      });
  }

  getPortfolioValues() {
    return this._http.get('http://'+ myGlobals.srv +'/ws/service/portfolioValue.php').map((responseData) => {
        return responseData.json();
      });
  }
}
