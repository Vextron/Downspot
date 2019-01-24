import { Component, Input, OnChanges } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-album-song-list',
  templateUrl: './album-song-list.component.html',
  styleUrls: ['./album-song-list.component.scss']
})
export class AlbumSongListComponent implements OnChanges {

  @Input() songs: Array<any>;
  @Input() album_name: string;

  constructor(private data_service: DataShareService) { }

  ngOnChanges() {

    this.songs = this.songs.map( item => {

      const new_time: number = item.duration_ms / 1000;

      const min = (new_time / 60).toString().split('.')[0];
      const sec = Math.floor((new_time % 60));
      item.duration_ms = min + ':' + Math.floor((sec / 10)).toString() + Math.floor((sec % 10)).toString();

      return item;
    });
  }

  add_song(song) {

    const new_song = Object.assign({album: {name: this.album_name}}, song);

    this.data_service.openSnackBar(new_song);
  }

}
