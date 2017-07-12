'use strict';

import {
    Component,
    Inject,
    enableProdMode
}                               from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators
}                               from "@angular/forms";
import { ISubscription }        from 'rxjs/Subscription';
import { AppObservableService } from '../app/app-observable-service';
import { AppEvent }             from '../models/appEvent';
import { HomeService }          from './home-service';
import { Url }                  from '../models/url';

enableProdMode();

@Component({
    selector: 'content',
    templateUrl: '../../templates/home/home-content.html'
})
export class HomeContentComponent {
    private urlChangeSubs: ISubscription;
    public homeContentForm: FormGroup;
    public ctrlLongUrl: FormControl;
    public ctrlCustomAlias: FormControl;
    public custom: string;
    public longUrl: string;
    public required: string;
    public customVal: string;
    public customAlias: string;
    public submitText: string;
    public formSubmitted: boolean;
    public url: Url;

    constructor(
        @Inject(HomeService) private readonly service: HomeService,
        @Inject(AppObservableService) private readonly  appObservableService: AppObservableService) {
        this.custom = 'Custom alias (optional)';
        this.longUrl = 'Enter long URL to TinyDan-fy.';
        this.required = 'Required field.';
        this.customVal = 'May contain letters, numbers, and dashes.';
        this.submitText = 'TinyDan-fy it!';
        this.formSubmitted = false;

        // build the form
        this.ctrlLongUrl = new FormControl('', [Validators.required]);
        this.ctrlCustomAlias = new FormControl('', [this.customAliasValidator]);
        this.homeContentForm = new FormGroup({
            longUrl: this.ctrlLongUrl,
            customAlias: this.ctrlCustomAlias
        });
    }

    public ngOnInit() {
        this.service.init();
        this.url = this.service.getUrl();

        const context = this;

        // subscribe to item changes
        this.urlChangeSubs = this.appObservableService.urlSaved$.subscribe((event: AppEvent) => {
            context.url = context.service.getUrl();
        });
    }

    public customAliasValidator(fieldControl: FormControl) {
        if (!fieldControl.value || fieldControl.value === '') {
            return null;
        }

        const valRegEx: RegExp = /^[A-Za-z0-9\-\\]+$/g;
        return fieldControl.value.toString().match(valRegEx) ? null : { invalid: true };
    }

    public onSubmit() {
        this.formSubmitted = true;
        if (!this.homeContentForm.valid) {
            return;
        }

        this.service.save(this.url);
    }
}
