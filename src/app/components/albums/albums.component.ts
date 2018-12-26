import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  @Input() albums: any;

  constructor(private data_service: DataShareService) { }

  ngOnInit() {
  }

}
