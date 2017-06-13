'use strict';

import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { RouterModule }         from '@angular/router';

// Routes
import { HomeRoutes } from './home.routes';

// Components
import { HomeComponent }      from './home';
import { HomeContentComponent } from './home-content';
import { HomeTitleComponent } from './home-title';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(HomeRoutes)
    ],
    providers: [
    ],
    declarations: [
        HomeComponent,
        HomeContentComponent,
        HomeTitleComponent,
    ]
})
export class HomeModule { }