import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  @Input() playlists;

  constructor(private data_service: DataShareService) { }

  ngOnInit() {
  }

}
