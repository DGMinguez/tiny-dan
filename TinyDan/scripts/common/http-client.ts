'use strict';

import {
    Injectable,
    Inject,
    enableProdMode
}                               from '@angular/core';
import {
    Http,
    Headers,
    Response,
    RequestOptionsArgs,
    RequestMethod,
    URLSearchParams
}                               from '@angular/http';
import { Observable }           from 'rxjs/Observable';
import { Observer }             from 'rxjs/Observer';
import { AppObservableService } from '../app/app-observable-service';
import { AppEventType }         from '../models/enums/appEventType';
import { AppEvent }             from '../models/appEvent';
import { KeyValue }             from '../models/keyValue';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

enableProdMode();

@Injectable()
export class HttpClient {
    private progressObserver: Observer<any>;
    private progress: number;
    private startTime: number;
    public progress$: Observable<any>;

    constructor(
        @Inject(Http) private readonly http: Http,
        @Inject(AppObservableService) private readonly appObservableService: AppObservableService) {
    }

    public get(url: string, queryStrings?: KeyValue[], headers?: KeyValue[]): Observable<Response> {
        const options: RequestOptionsArgs = {
            url: url,
            method: RequestMethod.Get,
            search: null,
            headers: new Headers({
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=0, no-store, no-cache',
                'Pragma': 'no-cache'
            })
        }

        // Add query string params
        if (queryStrings && queryStrings.length > 0) {
            const qsParams: URLSearchParams = new URLSearchParams();
            queryStrings.forEach((qs: KeyValue) => {
                qsParams.append(qs.key, encodeURIComponent(qs.value.toString()));
            });

            options.search = qsParams;
        }

        // Add headers
        if (headers && headers.length > 0) {
            headers.forEach((h: KeyValue) => {
                options.headers.append(h.key, h.value);
            });
        }

        console.log('HttpClient: get()');
        return this.http.get(url, options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((err: any) => {
                const apiErrorEvent: AppEvent = this.appObservableService.getEvent(AppEventType.ApiError);
                apiErrorEvent.payload = err;
                this.appObservableService.publish(apiErrorEvent);
                return Observable.throw(new Error(err.status));
            });
    }

    public post(url: string, body: string, queryStrings?: KeyValue[], headers?: KeyValue[]): Observable<Response> {
        let options: RequestOptionsArgs = {
            url: url,
            method: RequestMethod.Post,
            search: null,
            headers: new Headers({ 'Content-Type': 'application/json' })
        }

        // Add query string params
        if (queryStrings && queryStrings.length > 0) {
            const qsParams: URLSearchParams = new URLSearchParams();
            queryStrings.forEach((qs: KeyValue) => {
                qsParams.append(qs.key, encodeURIComponent(qs.value.toString()));
            });

            options.search = qsParams;
        }

        // Add headers
        if (headers && headers.length > 0) {
            headers.forEach((h: KeyValue) => {
                options.headers.append(h.key, h.value);
            });
        }

        console.log('HttpClient: post()');

        return this.http.post(url, body, options)
            .map((res: Response) => {
                if (res.text()) {
                    return res.json();
                }
                else {
                    return {};
                }
            }).catch((err: any) => {
                const apiErrorEvent: AppEvent = this.appObservableService.getEvent(AppEventType.ApiError);
                apiErrorEvent.payload = err;
                this.appObservableService.publish(apiErrorEvent);
                return Observable.throw(err);
            });
    }

    public delete(url: string, queryStrings?: KeyValue[], headers?: KeyValue[]): Observable<Response> {
        const options: RequestOptionsArgs = {
            url: url,
            method: RequestMethod.Delete,
            search: null,
            headers: new Headers({ 'Content-Type': 'application/json' })
        }

        // Add query string params
        if (queryStrings && queryStrings.length > 0) {
            const qsParams: URLSearchParams = new URLSearchParams();
            queryStrings.forEach((qs: KeyValue) => {
                qsParams.append(qs.key, encodeURIComponent(qs.value.toString()));
            });

            options.search = qsParams;
        }

        // Add headers
        if (headers && headers.length > 0) {
            headers.forEach((h: KeyValue) => {
                options.headers.append(h.key, h.value);
            });
        }

        console.log('HttpClient: delete()');

        return this.http.delete(url, options)
            .map((res: Response) => {
                return res;
            })
            .catch((err: any) => {
                const apiErrorEvent: AppEvent = this.appObservableService.getEvent(AppEventType.ApiError);
                apiErrorEvent.payload = err;
                this.appObservableService.publish(apiErrorEvent);
                return Observable.throw(err);
            });
    }

    public upload(url: string, files: File[]): Observable<any> {
        console.log('HttpClient: upload()');

        return Observable.create((observer: any) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("file", files[i], encodeURIComponent(files[i].name));
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                if (this.progressObserver) {
                    this.progressObserver.next(this.progress);
                }
            };

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}
