import {
    Injectable,
    Inject,
    enableProdMode
}                       from '@angular/core';
import { HttpClient }   from '../common/http-client';
import { Url }          from '../models/url';

enableProdMode();

@Injectable()
export class HomeApiService {
    constructor(@Inject(HttpClient) private readonly httpClient: HttpClient) {
    }

    public save(url: Url) {
        const urlStr: string = JSON.stringify(url);
        console.log(`HomeApiService: save(${urlStr})`);
        const  body: string = urlStr;
        return this.httpClient.post('api/url', body);
    }
}