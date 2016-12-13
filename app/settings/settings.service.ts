import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Response} from "angular2/http";
import {Observable} from  'rxjs/Observable';
import myGlobals = require('./../../globals.ts');

import 'rxjs/operator/map';
import 'rxjs/Rx';


@Injectable()
export class SettingsService {
  constructor (private _http: Http) {}

  getFunds() {
    return this._http.get('http://'+ myGlobals.srv +'/ws/service/funds.php').map((responseData) => {
        return responseData.json();
      });
  }

  setFunds(funds : string) {
    this._http.post('http://'+ myGlobals.srv +'/ws/service/setfunds.php', funds).toPromise().then(waitingDialog.hide());
  }
}
