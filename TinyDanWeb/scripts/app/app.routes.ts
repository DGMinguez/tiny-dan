import { Routes }      from '@angular/router';
import { HomeRoutes }  from '../home/home.routes';

const routes: Routes = [
    ...HomeRoutes
];

export const APP_ROUTER_PROVIDERS: Routes = routes;