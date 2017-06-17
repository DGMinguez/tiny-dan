'use strict';

import { CommonAppModule }      from '../common/common-app-module';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { RouterModule }         from '@angular/router';

// Routes
import { HomeRoutes } from './home.routes';

// Services
import { HomeApiService } from './home-api-service';
import { HomeService }    from './home-service';

// Components
import { HomeComponent }        from './home';
import { HomeContentComponent } from './home-content';
import { HomeTitleComponent }   from './home-title';

@NgModule({
    imports: [
        CommonAppModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(HomeRoutes)
    ],
    providers: [
        HomeApiService,
        HomeService
    ],
    declarations: [
        HomeComponent,
        HomeContentComponent,
        HomeTitleComponent,
    ]
})
export class HomeModule { }