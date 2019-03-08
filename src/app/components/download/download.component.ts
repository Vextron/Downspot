import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

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
  private playlists_to_download: Array<Object>;
  private albums_to_download: Array<Object>;
  display_songs: any[] = [];
  private subscription: any;

  constructor(private data_service: DataShareService, private youtube_service: YoutubeService, private router: Router) {

    this.subscription = this.data_service.get_songs().subscribe( data => {

      this.songs_to_download = data;
    });

    this.data_service.get_albums().subscribe( data => {

      this.albums_to_download = data;
    });

    this.data_service.get_playlists().subscribe( data => {

      this.playlists_to_download = data;
      console.log(data)
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

    const elemsFAB = document.querySelectorAll('.fixed-action-btn');
    const instancesFAB = M.FloatingActionButton.init(elemsFAB.item(1), {direction: 'left'});

    const elemsTol = document.querySelectorAll('.tooltipped');
    const instancesTol = M.Tooltip.init(elemsTol, {enterDelay: 100, margin: 1});
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

  remove(id) {

    this.data_service.remove_song(id);
    this.display_songs = this.display_songs.filter( songD => songD.song.id !== id);
  }

  remove_playlist(id, tracks) {

    this.playlists_to_download = this.playlists_to_download.filter( (playlistD: any) => playlistD.id !== id);
    this.data_service.remove_playlist(id, tracks);
  }

  remove_album(id, tracks) {

    this.albums_to_download = this.albums_to_download.filter( (albumD: any) => albumD.id !== id);
    this.data_service.remove_album(id, tracks);
  }

  playlist_details(id) {

    this.router.navigate(['/navigation/playlist', id]);
  }

  album_details(id) {

    this.router.navigate(['/navigation/album', id]);
  }

  download_set(set) {

    let downloaded = 0;
    set.downloading = true;
    
    set.tracks.forEach( track => {
      console.log(set);
      
      this.youtube_service.get_info(track.track).subscribe( data => {
        
        if (data) {

          this.youtube_service.download_song(data[0].id, track.track.name).subscribe( sound_file => {

            const file = new Blob([sound_file], { type: 'audio/mp3' });
            saveAs(file, `${track.track.name}.mp3`);

            downloaded++;
            set.progress = downloaded / set.tracks.length;

            if (downloaded === set.tracks.length) {

              set.downloading = false;
              set.downloaded = true;
              set.progress = 0;
            }
          });
        }
      });
    });
  }

  download_album(set) {

    let downloaded = 0;
    set.downloading = true;
    
    set.tracks.forEach( track => {
      console.log(set);
      
      this.youtube_service.get_info(track).subscribe( data => {
        
        if (data) {

          this.youtube_service.download_song(data[0].id, track.name).subscribe( sound_file => {

            const file = new Blob([sound_file], { type: 'audio/mp3' });
            saveAs(file, `${track.name}.mp3`);

            downloaded++;
            set.progress = downloaded / set.tracks.length;

            if (downloaded === set.tracks.length) {

              set.downloading = false;
              set.downloaded = true;
              set.progress = 0;
            }
          });
        }
      });
    });
  }

  download() {

    this.display_songs.forEach( song => {

      if (!!song && song.checked_id !== '') {

        this.youtube_service.download_song(song.checked_id, song.song.name).subscribe( data => {

          const file = new Blob([data], { type: 'audio/mp3' });
          saveAs(file, `${song.song.name}.mp3`);
        });
      }
    });
  }

}
