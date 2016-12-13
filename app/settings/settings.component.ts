import {Component, View} from "angular2/core";
import {SettingsService} from "./settings.service";
import {OnInit} from "angular2/core";
import {Fund} from "../fuds/fund";

@Component({
    selector: 'settings-component',
    template: `
        <table>
            <tr>
              <td>Name</td>
              <td>Value</td>
            </tr>
          <tr *ngFor="#fund of funds">
            <td>{{ fund.name }}</td>
            <td><input type="text" [(ngModel)]="fund.portfolio"></td>
          </tr>
        </table>
        <button (click)="sendFunds()">Save</button>
    `,
    providers: [ SettingsService ]
})
export class SettingsComponent implements OnInit {
  funds : Fund[] = [];

  constructor(private _settingsService : SettingsService) { }

  getSettings() {
    this._settingsService.getFunds().subscribe(
      data => this.funds = data,
      error => alert(error)
    );
  }

  ngOnInit():any {
    this.getSettings();
  }

  sendFunds() {
    waitingDialog.show();
    this._settingsService.setFunds(JSON.stringify(this.funds));
  }
}
