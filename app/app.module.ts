/**
 * Created by stefania on 9/16/16.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from "./app.component";
import { routing, appRoutingProviders } from "./app.routing";
import { DashboardComponent } from "./dashboard.component";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";

@NgModule({

    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
    ],

    declarations: [
        AppComponent,
        DashboardComponent,
        ConfigurationComponent
    ],

    providers: [
        appRoutingProviders
    ],

    bootstrap: [ AppComponent ]
})

export class AppModule { }