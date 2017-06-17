'use strict';

import {
    Injectable,
    Inject,
    enableProdMode
}                       from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import { Observer }     from 'rxjs/Observer';
import { AppEvents }    from './app-events';
import { AppEventType } from '../models/enums/appEventType';
import { AppEvent }     from '../models/appEvent';

import 'rxjs/add/operator/share';

enableProdMode();

@Injectable()
export class AppObservableService {
    private apiErrorObserver: Observer<AppEvent>;
        private urlSavedObserver: Observer<AppEvent>;
    public apiError$: Observable<AppEvent>;
    public urlSaved$: Observable<AppEvent>;

    constructor(@Inject(AppEvents) private readonly appEvents: AppEvents) {
    }

    public init(): void {
        this.apiError$ = new Observable<AppEvent>((observer: Observer<AppEvent>) => {
            this.apiErrorObserver = observer;
        }).share();

        this.urlSaved$ = new Observable<AppEvent>((observer: Observer<AppEvent>) => {
            this.urlSavedObserver = observer;
        }).share();
    }

    public publish(event: AppEvent): void {
        let evt: AppEvent = this.getEvent(event.type);
        if (event.isStatic) {
            if (!evt.payload) {
                // if static event, let's save the payload
                this.setStaticEvent(event);
            }

            evt = this.getEvent(event.type);
            event.payload = evt.payload;
        }

        switch (event.type) {
            case AppEventType.ApiError:
                this.apiErrorObserver.next(event);
                break;
            case AppEventType.UrlSaved:
                this.urlSavedObserver.next(event);
                break;
        }
    }

    public getEvent(eventType: AppEventType): AppEvent {
        const events: AppEvent[] = this.appEvents.events.filter((ae: AppEvent): boolean => {
            return ae.type === eventType;
        });

        return events[0]; 
    }

    private setStaticEvent(event: AppEvent): void {
        const events: AppEvent[] = this.appEvents.events.filter((ae: AppEvent): boolean => {
            return ae.type === event.type && ae.isStatic;
        });

        if (events.length > 0) {
            events[0].payload = event.payload;
        }
    }
}