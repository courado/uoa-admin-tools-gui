/**
 * Created by stefania on 9/16/16.
 */
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard.component";
import { TopicsComponent } from "./pages/faq/topics.components";
import { QuestionsComponent } from "./pages/faq/questions.component";
import { PagesComponent } from "./pages/helpcontent/pages.component";
import { PageHelpContentsComponent } from "./pages/helpcontent/page-help-contents.component";
import { NewPageHelpContentComponent } from "./pages/helpcontent/new-page-help-content.component";
import { EditPageHelpContentComponent } from "./pages/helpcontent/edit-page-help-content.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'topics',
        component: TopicsComponent,
    },
    {
        path: 'questions',
        component: QuestionsComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
    },
    {
        path: 'pageContents',
        component: PageHelpContentsComponent,
    },
    {
        path: 'pageContents/new',
        component: NewPageHelpContentComponent,
    },
    {
        path: 'pageContents/edit/:id',
        component: EditPageHelpContentComponent,
    }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);