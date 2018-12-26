import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';
import { SpotifyService } from '../../services/spotify.service';

import { ActivatedRoute } from '@angular/router';

import * as M from '../../../assets/materialize.min.js';

interface TopChoices {

  top_artists: any;
  top_tracks: any;
}

interface MainFrame {

  image: String;
  name: String;
  artist: String;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit, AfterViewInit {

  top_choices: TopChoices;
  main_frame: MainFrame = { image: '', name: '', artist: '' };

  constructor(private data_service: DataShareService, private service: SpotifyService, private route: ActivatedRoute, 
              ) {
   }

  ngOnInit() {

    this.top_choices = this.route.snapshot.data.profile_data;

    this.main_frame.image = this.top_choices.top_tracks.items[0].album.images[0].url;
    this.main_frame.name = this.top_choices.top_tracks.items[0].name;
    this.main_frame.artist = this.top_choices.top_tracks.items[0].artists[0].name;

    this.top_choices.top_tracks.items = this.top_choices.top_tracks.items.map( item => {

      const new_time: number = item.duration_ms / 1000;

      const min = (new_time / 60).toString().split('.')[0];
      const sec = Math.floor((new_time % 60));
      
      item.duration_ms = min + ':' + Math.floor((sec / 10)).toString() + Math.floor((sec % 10)).toString();

      return item;
    });

    console.log(this.top_choices);
  }

  ngAfterViewInit() {

    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, {});
  }

  change_track(song) {

    this.main_frame.image = song.album.images[0].url;
    this.main_frame.name = song.name;
    this.main_frame.artist = song.artists[0].name;
  }

}
