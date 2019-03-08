import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { DataShareService } from '../../services/data-share.service';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  @Input() albums: any;

  private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };

  constructor(private data_service: DataShareService, private router: Router, private spotify_service: SpotifyService) { }

  ngOnInit() {
  }

  details(id) {

    this.router.navigate(['navigation/album', id]);
  }

  add_album(album) {

    this.spotify_service.get_album_tracks(this.hash.access_token, album.id).subscribe( (data: any) => {
      
      const new_album = {
        
        name: album.name,
        tracks: data.tracks.items,
        image: album.images[0].url,
        downloaded: false,
        downloading: false,
        progress: 0,
        type: 'album',
        id: album.id
      };

      this.data_service.openSnackBar(new_album);
    });
  }

}
