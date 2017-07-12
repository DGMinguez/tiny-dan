'use strict';

import {
    Component,
    OnInit,
    enableProdMode
}   from '@angular/core';

enableProdMode();

@Component({
    selector: 'title-bar',
    templateUrl: '../../templates/home/home-title.html'
})
export class HomeTitleComponent {
    public title: string;
    public subTitle: string;

    constructor() {
        this.title = 'TinyDan';
        this.subTitle = 'Because size does matter.'
    }

    public ngOnInit(): void {
    }
}
