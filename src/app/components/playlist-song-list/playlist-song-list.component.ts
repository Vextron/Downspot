import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-playlist-song-list',
  templateUrl: './playlist-song-list.component.html',
  styleUrls: ['./playlist-song-list.component.scss']
})
export class PlaylistSongListComponent implements OnInit {

  @Input() songs: Array<any>;
  @Input() playlist_name: string;

  constructor() { }

  ngOnInit() {

    this.songs = this.songs.map( item => {

      const new_time: number = item.duration_ms / 1000;

      const min = (new_time / 60).toString().split('.')[0];
      const sec = Math.floor((new_time % 60));
      item.duration_ms = min + ':' + Math.floor((sec / 10)).toString() + Math.floor((sec % 10)).toString();

      return item;
    });
  }

}
