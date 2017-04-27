/**
 * Created by stefania on 9/16/16.
 */
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard.component";
import { TopicsComponent } from "./pages/faq/topics.components";
import { QuestionsComponent } from "./pages/faq/questions.component";

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
    }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);