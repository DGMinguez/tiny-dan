'use strict';

import {
    Component,
    enableProdMode,
    OnInit,
    OnDestroy
}                             from '@angular/core';
import { HomeTitleComponent } from './home-title';

enableProdMode();

@Component({
    templateUrl: '../../templates/home/home.html'
})
export class HomeComponent {
    constructor() {
    }

    public ngOnInit() {
    }

    public ngOnDestroy(): void {
    }
}
