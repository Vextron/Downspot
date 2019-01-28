import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  @Input() playlists;

  constructor(private data_service: DataShareService, private router: Router) { }

  ngOnInit() {
  }

  details(id) {

    this.router.navigate(['/navigation/playlist', id]);
  }

  add(playlist) {

    const new_playlist = {name: playlist.name, id: playlist.id, type: 'playlist'};
    this.data_service.openSnackBar(new_playlist);
  }

}
