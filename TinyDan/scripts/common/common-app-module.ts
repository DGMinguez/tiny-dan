'use strict';

import { NgModule }   from '@angular/core';

// Services
import { HttpClient } from './http-client';

@NgModule({
    providers: [
        HttpClient
    ]
})
export class CommonAppModule { }