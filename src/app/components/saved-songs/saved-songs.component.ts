import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-songs',
  templateUrl: './saved-songs.component.html',
  styleUrls: ['./saved-songs.component.scss']
})
export class SavedSongsComponent implements OnInit {

  songs: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.songs = this.route.snapshot.data.saved_songs.items.map( track => track.track);
  }

}
