import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SpotifyService {

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

    get_auth_user_profile(access_token: string) {
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get('http://localhost:4200/api/profile', {headers: header});
    }

    get_top_tracks(access_token: string, id: string) {
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        const params = new HttpParams().set('id', id);

        return this.http.get('http://localhost:4200/api/top', {headers: header, params: params});
    }

    get_artists(access_token: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get('http://localhost:4200/api/artists', {headers: header});
    }

    get_artist_detail(access_token: string, id: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(`http://localhost:4200/api/artist/${id}`, {headers: header});
    }

    get_saved_albums(access_token: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get('http://localhost:4200/api/albums', {headers: header});
    }

    get_album_tracks(access_token: string, id: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(`http://localhost:4200/api/album/${id}`, {headers: header});
    }
}

