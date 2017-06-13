'use strict';

import {
    Component,
    enableProdMode,
    OnInit,
    OnDestroy,
    Inject
}                               from '@angular/core';
import { ISubscription }        from 'rxjs/Subscription';

import '../../css/site.css';

enableProdMode();

@Component({
    selector: 'app',
    templateUrl: '../../templates/app/app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
    private apiErrorSubs: ISubscription;
    public loading: boolean;

    constructor() {
        this.loading = true;
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy() {
        if (this.apiErrorSubs) {
            this.apiErrorSubs.unsubscribe();
        }
    }
}
