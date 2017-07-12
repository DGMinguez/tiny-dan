'use strict';

import {
    Injectable,
    Inject,
    enableProdMode
}                               from '@angular/core';
import { AppObservableService } from '../app/app-observable-service';
import { AppEvent }             from '../models/appEvent';
import { AppEventType }         from '../models/enums/appEventType';
import { HomeApiService }       from './home-api-service';
import { Url }                  from '../models/url';
import 'rxjs/add/operator/share';

enableProdMode();

@Injectable()
export class HomeService {
    private tags: any[];
    private url: Url;

    constructor(
        @Inject(HomeApiService) private readonly apiService: HomeApiService,
        @Inject(AppObservableService) private readonly appObservableService: AppObservableService) {
    }

    public init() {
        this.url = {
            id: 0,
            longUrl: '',
            customAlias: '',
            urlKey: ''
        }
    }

    public getUrl() {
        return this.url;
    }

    public save(url: Url) {
        const context = this;
        this.apiService.save(url)
            .subscribe(
                (data: any) => {
                    const urlSavedEvent: AppEvent = context.appObservableService.getEvent(AppEventType.UrlSaved);
                    context.url = data;
                    context.appObservableService.publish(urlSavedEvent);
                },
                (err: any) => {
                    console.log(err);
                },
                () => {
                    console.log('Done');
                }
            );
    }
}
