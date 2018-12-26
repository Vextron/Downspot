import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  @Input() artists: any;

  constructor(private data_service: DataShareService) { }

  ngOnInit() {
  }

}
