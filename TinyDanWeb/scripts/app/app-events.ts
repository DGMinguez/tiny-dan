'use strict';

import {
    Injectable,
    enableProdMode
}                       from '@angular/core';
import { AppEventType } from '../models/enums/appEventType';
import { AppEvent }     from '../models/appEvent';

enableProdMode();

@Injectable()
export class AppEvents {
    public events: AppEvent[];
    constructor() {
        this.events = [
            // Static Events

            // Non-static Events
            {
                type: AppEventType.ApiError,
                payload: null,
                isStatic: false
            },
            {
                type: AppEventType.UrlSaved,
                payload: null,
                isStatic: false
            }
        ];
    }
}
