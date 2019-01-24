import { Component, OnChanges, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnChanges {

  @Input() songs: Array<any>;

  constructor(private data_service: DataShareService) { }

  ngOnChanges() {

    console.log(this.songs);
    
    this.songs = this.songs.map( item => {

      const new_time: number = item.duration_ms / 1000;

      const min = (new_time / 60).toString().split('.')[0];
      const sec = Math.floor((new_time % 60));
      item.duration_ms = min + ':' + Math.floor((sec / 10)).toString() + Math.floor((sec % 10)).toString();

      return item;
    });
  }
}
