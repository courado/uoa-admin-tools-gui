/**
 * Created by stefania on 9/16/16.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from "./app.component";
import { routing, appRoutingProviders } from "./app.routing";
import { DashboardComponent } from "./dashboard.component";
import { TopicsComponent } from "./pages/faq/topics.components";
import { QuestionsComponent } from "./pages/faq/questions.component";
import { FAQService } from "./services/faq.service";

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
        TopicsComponent,
        QuestionsComponent
    ],
    providers: [
        FAQService,
        appRoutingProviders
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }