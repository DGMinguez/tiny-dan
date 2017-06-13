'use strict';

import { Routes }        from '@angular/router';
import { HomeComponent } from './home';

export const HomeRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        component: HomeComponent
    }    
];