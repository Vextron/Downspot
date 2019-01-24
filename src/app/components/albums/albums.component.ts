import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  @Input() albums: any;

  constructor(private data_service: DataShareService, private router: Router) { }

  ngOnInit() {
  }

  details(id) {

    this.router.navigate(['navigation/album', id]);
  }

  add_album(album) {

    const new_album = {name: album.name, tracks: album.tracks, type: 'album'};

    this.data_service.openSnackBar(new_album);
  }

}
