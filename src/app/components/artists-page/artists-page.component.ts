import { Component, OnInit } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';
import { SpotifyService } from '../../services/spotify.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.scss']
})
export class ArtistsPageComponent implements OnInit {

  artists: any;
  value = '';

  private timer = null;

  constructor(public data_service: DataShareService, private serive: SpotifyService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.artists = this.route.snapshot.data.artists_data['items'];
    console.log(this.artists);

  }

  get_songs() {

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.value !== '') {

        console.log('hello');
      }
    }, 1000);
  }

}
