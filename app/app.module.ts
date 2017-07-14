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
import { TopicsFormComponent } from "./pages/faq/topics-form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalFormComponent } from "./pages/modal-form.component";
import { QuestionsFormComponent } from "./pages/faq/questions-form.component";
import { DeleteConfirmationDialogComponent } from "./pages/delete-confirmation-dialog.component";
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { PagesComponent } from "./pages/helpcontent/pages.component";
import { HelpContentService } from "./services/help-content.service";
import { PageFormComponent } from "./pages/helpcontent/page-form.component";
import { PageHelpContentsComponent } from "./pages/helpcontent/page-help-contents.component";
import { NewPageHelpContentComponent } from "./pages/helpcontent/new-page-help-content.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { PageContentFormComponent } from "./pages/helpcontent/page-help-content-form.component";
import { EditPageHelpContentComponent } from "./pages/helpcontent/edit-page-help-content.component";

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        JWBootstrapSwitchModule,
        CKEditorModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        TopicsComponent,
        QuestionsComponent,
        TopicsFormComponent,
        ModalFormComponent,
        QuestionsFormComponent,
        DeleteConfirmationDialogComponent,
        PagesComponent,
        PageFormComponent,
        PageHelpContentsComponent,
        NewPageHelpContentComponent,
        PageContentFormComponent,
        EditPageHelpContentComponent
    ],
    providers: [
        FAQService,
        HelpContentService,
        appRoutingProviders
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }