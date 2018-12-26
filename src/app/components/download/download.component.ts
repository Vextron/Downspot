import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DataShareService } from '../../services/data-share.service';
import { YoutubeService } from '../../services/youtube.service';

import { saveAs } from 'file-saver';

import * as M from '../../../assets/materialize.min.js';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, AfterViewInit, OnDestroy {

  private songs_to_download: Array<Object>;
  private display_songs: any[] = [];
  private subscription: any;

  constructor(private data_service: DataShareService, private youtube_service: YoutubeService) {

    this.subscription = this.data_service.get_songs().subscribe( data => {

      this.songs_to_download = data;
    });
  }

  ngOnInit() {

    this.songs_to_download.forEach( song => {

      this.display_songs.push({song: song, loaded: false, options: [], checked_id: ''});
    });
  }

  ngAfterViewInit() {

    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems, {});
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  get_options(song) {

    if (!song.loaded) {

      this.youtube_service.get_info(song.song).subscribe( data => {

        song.options = data;
        song.loaded = true;
      });
    }
  }

  download() {

    this.display_songs.forEach( song => {

      this.youtube_service.download_song(song.checked_id, song.song.name).subscribe( data => {

        const file = new Blob([data], { type: 'audio/mp3' });
        saveAs(file, `${song.song.name}.mp3`);
      });
    });
  }

}
