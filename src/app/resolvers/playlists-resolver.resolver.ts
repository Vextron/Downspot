import { Injectable } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

import { Resolve } from '@angular/router';

@Injectable()
export class PlaylistResolver implements Resolve<any> {

    private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };

    constructor(private service: SpotifyService) {}

    resolve() {

        return this.service.get_playlists(this.hash.access_token);
    }
}
