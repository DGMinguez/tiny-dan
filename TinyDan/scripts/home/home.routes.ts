'use strict';

import { Routes }        from '@angular/router';
import { HomeComponent } from './home';

export const HomeRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'home',
        redirectTo: '/'
    }
];