'use strict';

import {
    Injectable,
    Inject,
    enableProdMode
}                       from '@angular/core';
import { Response }     from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import { HttpClient }   from '../common/http-client';
import { KeyValue }     from '../models/keyValue';

enableProdMode();

@Injectable()
export class DashboardApiService {
    constructor( @Inject(HttpClient) private httpClient: HttpClient) {
    }

    public getFollowingCount(filter: string): Observable<Response> {
        console.log('DashboardApiService: getFollowingCount(' + filter + ')');
        let qs: KeyValue[];
        let uri: string;
        qs = [
            {
                key: 'filter',
                value: filter
            },
            // TODO: Start/End dates hardcoded to 0 for now
            {
                key: 'startDate',
                value: '0'
            },
            {
                key: 'endDate',
                value: '0'
            }
        ];
        uri = 'api/v1/users/getfollowingitemscount';
        return this.httpClient.get(uri, qs);
    }

    public getMyItemsCount(filter: string): Observable<Response> {
        console.log('DashboardApiService: getMyItemsCount(' + filter + ')');
        let qs: KeyValue[];
        let uri: string;
        qs = [
            {
                key: 'filter',
                value: filter
            },
            // TODO: Start/End dates hardcoded to 0 for now
            {
                key: 'startDate',
                value: '0'
            },
            {
                key: 'endDate',
                value: '0'
            }
        ];
        uri = 'api/v1/users/getmyitemscount';
        return this.httpClient.get(uri, qs);
    }

    public getPinnedTags(tagIds: string): Observable<Response> {
        console.log('DashboardApiService: getPinnedTag(' + tagIds + ')');
        let qs: KeyValue[];
        let uri: string;
        qs = [
            {
                key: 'tagIds',
                value: tagIds
            }
        ];
        uri = 'api/v1/users/getpinnedtags';
        return this.httpClient.get(uri, qs);
    }

    public getTagSuggestions(tagName: string): Observable<Response> {
        let qs: KeyValue[] = [
            {
                key: 'prefix',
                value: tagName
            }
        ];
        return this.httpClient.get('api/v1/tags/search', qs);
    }

    public unpinTag(tagId: string) {
        console.log('DashboardApiService: unpinTag(' + tagId + ')');
        let qs: KeyValue[];
        let uri: string;
        qs = [
            {
                key: 'tagId',
                value: tagId
            }
        ];
        uri = 'api/v1/users';
        return this.httpClient.delete(uri, qs);
    }

    public pinTag(tags: any[]) {
        console.log('DashboardApiService: pinTag()');
        let qs: KeyValue[];
        let uri: string;
        let body: any;

        let pinnedTags: any[] = [];
        let pinnedTag: any;
        tags.forEach(function (tag: any) {
            pinnedTag = {
                id: tag.id,
                name: tag.name
            };
            pinnedTags.push(pinnedTag);
        });

        body = { tags };
        uri = 'api/v1/users/pintag';
        return this.httpClient.post(uri, "'" + JSON.stringify(pinnedTags) + "'");
    }
}
