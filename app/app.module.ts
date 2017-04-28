/**
 * Created by stefania on 9/16/16.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from "./app.component";
import { routing, appRoutingProviders } from "./app.routing";
import { DashboardComponent } from "./dashboard.component";
import { TopicsComponent } from "./pages/faq/topics.components";
import { QuestionsComponent } from "./pages/faq/questions.component";
import { FAQService } from "./services/faq.service";
import { ModalModule } from 'ngx-bootstrap';
import {TopicsFormComponent} from "./pages/faq/topics-form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ModalFormComponent} from "./pages/modal-form.component";

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        TopicsComponent,
        QuestionsComponent,
        TopicsFormComponent,
        ModalFormComponent
    ],
    providers: [
        FAQService,
        appRoutingProviders
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }