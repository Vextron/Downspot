import { Component, OnInit, Input } from '@angular/core';

import { DataShareService } from '../../services/data-share.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private data_service: DataShareService) {

    this.data_service.get_user().subscribe( user => {

      this.user = user;
    });
   }

  ngOnInit() {
  }

}
