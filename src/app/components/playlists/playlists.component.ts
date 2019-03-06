import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';
import { SpotifyService } from '../../services/spotify.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  @Input() playlists;

  private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };

  constructor(private data_service: DataShareService, private spotify_service: SpotifyService, private router: Router) { }

  ngOnInit() {
  }

  details(id) {

    this.router.navigate(['/navigation/playlist', id]);
  }

  add(playlist) {

    this.spotify_service.get_playlist_detail(this.hash.access_token, playlist.id).subscribe( (data: any) => {

      const new_playlist = {
        
        name: playlist.name,
        image: playlist.images[0].url,
        id: playlist.id,
        tracks: data.tracks.items,
        type: 'playlist'
      };
     
      this.data_service.openSnackBar(new_playlist);
    });
  }

}
