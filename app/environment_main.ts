import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {AppComponent} from "./environment_app.component";


bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);
