import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {

  details: any;
  tracks: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.details = this.route.snapshot.data.playlist_tracks;

    this.tracks = this.details.tracks.items.map( track => track.track);
  }

}
