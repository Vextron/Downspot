import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SpotifyService {

    // private endpoint = 'http://localhost:4200/api';
    // NOTE: Production only
    private endpoint = '';

    constructor(private http: HttpClient) { }

    get_code() {

        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

        return this.http.get(this.endpoint + '/login', {headers: headers});
    }

    get_token(code: string) {
        const params = new HttpParams().set('code', code);

        return this.http.get(this.endpoint + '/token', {params: params});
    }

    get_songs(access_token: string, to_search: string, type: string = 'playlists') {

        const params = new HttpParams().set('type', type).set('to_search', to_search);
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(this.endpoint + '/getsongs', {headers: header, params: params});
    }

    get_auth_user_profile(access_token: string) {
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(this.endpoint + '/profile', {headers: header});
    }

    get_top_tracks(access_token: string, id: string) {
        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        const params = new HttpParams().set('id', id);

        return this.http.get(this.endpoint + '/top', {headers: header, params: params});
    }

    get_artists(access_token: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(this.endpoint + '/artists', {headers: header});
    }

    get_artist_detail(access_token: string, id: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(`${this.endpoint}/artist/${id}`, {headers: header});
    }

    get_saved_albums(access_token: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(this.endpoint + '/albums', {headers: header});
    }

    get_album_tracks(access_token: string, id: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(`${this.endpoint}/album/${id}`, {headers: header});
    }

    get_playlists(access_token: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(this.endpoint + '/playlists', {headers: header});
    }

    get_playlist_detail(access_token: string, id: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(`${this.endpoint}/playlist/${id}`, {headers: header});
    }

    get_saved_songs(access_token: string) {

        const header = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);

        return this.http.get(this.endpoint + '/songs', {headers: header});
    }
}

