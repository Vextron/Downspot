import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  @Input() artists: any;

  constructor(private data_service: DataShareService, private router: Router) { }

  ngOnInit() {
  }

  details(id) {

    this.router.navigate(['navigation/artist', id]);
  }

}
