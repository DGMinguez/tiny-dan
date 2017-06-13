'use strict';

// Angular Modules
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { RouterModule }         from '@angular/router';

// Application Modules
import { HomeModule } from '../home/home-module';

// Routes
import { APP_ROUTER_PROVIDERS } from './app.routes';

// Components
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(APP_ROUTER_PROVIDERS),
        HomeModule
    ],
    providers: [
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }