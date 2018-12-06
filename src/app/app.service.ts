import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) { }

    get_code() {

        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

        return this.http.get('http://localhost:4200/api/login', {headers: headers});
    }

    get_token(code: string) {

        const params = new HttpParams().set('code', code);
        return this.http.get('http://localhost:4200/api/token', {params: params});
    }

    get_songs(access_token: string, to_search: string, type: string = 'playlists') {

        const params = new HttpParams().set('type', type).set('to_search', to_search);
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get('http://localhost:4200/api/getsongs', {headers: header, params: params});
    }
}
