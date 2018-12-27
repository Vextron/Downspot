import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SpotifyService {

    constructor(private http: HttpClient) { }

    get_code() {

        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

        return this.http.get('/login', {headers: headers});
    }

    get_token(code: string) {
        const params = new HttpParams().set('code', code);

        return this.http.get('http://localhost:8080/token', {params: params});
    }

    get_songs(access_token: string, to_search: string, type: string = 'playlists') {

        const params = new HttpParams().set('type', type).set('to_search', to_search);
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get('http://localhost:8080/getsongs', {headers: header, params: params});
    }

    get_auth_user_profile(access_token: string) {
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get('http://localhost:8080/profile', {headers: header});
    }

    get_top_tracks(access_token: string) {
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get('http://localhost:8080/top', {headers: header});
    }
}

