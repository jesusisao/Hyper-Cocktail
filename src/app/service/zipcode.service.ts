import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ZipcodeService {

    constructor(private jsonp: Jsonp) { }

    /**
     * 郵便番号から住所を取得するためのJSONを返す関数。取得先は外部ドメイン。
     */
    requestAddress(zipcode: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('zipcode', zipcode);
        params.set('callback', 'JSONP_CALLBACK'); // JSONPの時の定型文

        return this.jsonp // ここが関数へのreturn
            .get('http://zipcloud.ibsnet.co.jp/api/search', { search: params })
            .map(
                response => {
                    return response.json() || {};
                }
            )
            .catch(
                error => {
                    return Observable.throw(error.statusText);
                }
            );
    }
}
