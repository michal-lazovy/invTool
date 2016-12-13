import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Response} from "angular2/http";
import {Observable} from  'rxjs/Observable';

import 'rxjs/operator/map';
import 'rxjs/Rx';


@Injectable()
export class SettingsService {
  constructor (private _http: Http) {}

  getFunds() {
    return this._http.get('http://127.0.0.1/ws/service/funds.php').map((responseData) => {
        return responseData.json();
      });
  }

  setFunds(funds : string) {
    this._http.post('http://127.0.0.1/ws/service/setfunds.php', funds).toPromise().then(waitingDialog.hide());
  }
}
