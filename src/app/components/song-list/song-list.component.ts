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

    this.songs = this.songs.map( item => {

      let new_time: number = item.duration_ms / 1000;

      let min = (new_time / 60).toString().split('.')[0];
      let sec = Math.floor((new_time % 60));
      
      item.duration_ms = min + ':' + Math.floor((sec / 10)).toString() + Math.floor((sec % 10)).toString();

      return item;
    });
  }
}
