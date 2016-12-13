import {Component, View} from "angular2/core";
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {RouteConfig} from 'angular2/router';
import {PortfolioComponent} from 'app/portfolio/portfolio.component';
import {SettingsComponent} from 'app/settings/settings.component';

@Component({
   selector: 'my-app',
   directives: [ROUTER_DIRECTIVES, PortfolioComponent, SettingsComponent],
   template: `
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" >Investment portfolio</a>
            </div>
            <ul class="nav navbar-nav">
                <li><a [routerLink]="['Portfolio']">Portfolio</a></li>
                <li><a [routerLink]="['Settings']">Settings</a></li>
            </ul>
        </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
    { path: "/portfolio", name: "Portfolio", component: PortfolioComponent, useAsDefault: true },
    { path: "/settings", name: "Settings", component: SettingsComponent }
])

export class AppComponent {

}
