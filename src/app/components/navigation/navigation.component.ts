import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { DataShareService } from '../../services/data-share.service';

import { SpotifyService } from '../../services/spotify.service';

import * as M from '../../../assets/materialize.min.js';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };
  user: any = {};
  loaded = false;

  constructor(private router: Router, private service: SpotifyService, private data_service: DataShareService) { 

    this.service.get_auth_user_profile(this.hash.access_token).subscribe( data => {

      this.user = data;
      this.loaded = true;

      this.data_service.add_user(data);
    });
  }

  ngOnInit() {

  }

  close() {
    this.sidenav.close();
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }
}
