import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataShareService } from '../../services/data-share.service';
import { SpotifyService } from '../../services/spotify.service';

import { ActivatedRoute } from '@angular/router';

interface Artist {

  artist: any;
  display: boolean;

}

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.scss']
})

export class ArtistsPageComponent implements OnInit {

  artists: any;
  cpy_artists: Artist[] = [];
  value = '';

  private timer = null;

  constructor(public data_service: DataShareService, private serive: SpotifyService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.artists = this.route.snapshot.data.artists_data['items'];
    this.cpy_artists = this.artists;

    console.log(this.artists);

  }

  clear() {

    this.value = '';
    this.cpy_artists = this.artists;
  }

  filter_artists() {

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.value !== '') {

        this.cpy_artists = this.artists.filter( artist => artist.name.toLowerCase().startsWith(this.value.toLocaleLowerCase()));

      } else {

        this.cpy_artists = this.artists;
      }

    }, 300);
  }

  details(id) {

    this.router.navigate(['navigation/artist', id]);
  }

}
