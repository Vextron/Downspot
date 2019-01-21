import { Injectable } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { DataShareService } from '../services/data-share.service';

import { Resolve } from '@angular/router';

@Injectable()
export class ProfileResolver implements Resolve<any> {

    private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };

    constructor(private service: SpotifyService, private data_service: DataShareService) {}

    resolve() {

        let id: string;

        this.data_service.get_user().subscribe( (data: any) => {

            id = data.id;
        });

        return this.service.get_top_tracks(this.hash.access_token, id);
    }
}
