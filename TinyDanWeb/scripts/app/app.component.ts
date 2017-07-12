'use strict';

import {
    Component,
    enableProdMode,
    OnInit,
    OnDestroy,
    Inject
}                               from '@angular/core';
import { ISubscription }        from 'rxjs/Subscription';
import { AppEvent }             from '../models/appEvent';
import { AppObservableService } from './app-observable-service';

import '../../css/site.css';

enableProdMode();

@Component({
    selector: 'app',
    templateUrl: '../../templates/app/app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
    private apiErrorSubs: ISubscription;

    constructor(@Inject(AppObservableService) private readonly appObservableService: AppObservableService) {
    }

    public ngOnInit(): void {
        this.appObservableService.init();

        this.apiErrorSubs = this.appObservableService.apiError$.subscribe(function (event: AppEvent) {
            const error: any = event.payload;

            // TODO: do something better here...
            alert(error);
        }.bind(this));
    }

    public ngOnDestroy() {
        if (this.apiErrorSubs) {
            this.apiErrorSubs.unsubscribe();
        }
    }
}
