import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-playlist-song-list',
  templateUrl: './playlist-song-list.component.html',
  styleUrls: ['./playlist-song-list.component.scss']
})
export class PlaylistSongListComponent implements OnInit {

  @Input() songs: Array<any>;
  @Input() playlist_name: string;

  constructor(private data_service: DataShareService) { }

  ngOnInit() {

    this.songs = this.songs.map( item => {

      const new_time: number = item.duration_ms / 1000;

      const min = (new_time / 60).toString().split('.')[0];
      const sec = Math.floor((new_time % 60));
      item.duration_ms = min + ':' + Math.floor((sec / 10)).toString() + Math.floor((sec % 10)).toString();

      return item;
    });
  }

  add_song(song) {

    const new_song = Object.assign({album: {name: this.playlist_name}}, song);

    this.data_service.openSnackBar(new_song);
  }

}
