import { Injectable } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PlaylistDetailResolver implements Resolve<any> {

    private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };

    constructor(private service: SpotifyService) {}

    resolve( route: ActivatedRouteSnapshot ) {

        return this.service.get_playlist_detail(this.hash.access_token, route.paramMap.get('id'));
    }
}
