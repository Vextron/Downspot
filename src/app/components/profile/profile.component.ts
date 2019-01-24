import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';
import { SpotifyService } from '../../services/spotify.service';

import { ActivatedRoute } from '@angular/router';

import * as M from '../../../assets/materialize.min.js';

interface TopChoices {

  top_artists: any;
  top_tracks: any;
  playlists: any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit, AfterViewInit {

  top_choices: TopChoices;

  constructor(public data_service: DataShareService, private service: SpotifyService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.top_choices = this.route.snapshot.data.profile_data;
    this.top_choices.top_tracks = this.top_choices.top_tracks.items.map( track => track.track);

    console.log(this.top_choices.top_tracks);
  }

  ngAfterViewInit() {

    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, {});
  }
}
