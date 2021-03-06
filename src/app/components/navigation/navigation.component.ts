import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { DataShareService } from '../../services/data-share.service';

import { SpotifyService } from '../../services/spotify.service';

import * as M from '../../../assets/materialize.min.js';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };
  user: any = {};
  loaded = false;
  songs_size = 0;

  constructor(private router: Router, private service: SpotifyService, private data_service: DataShareService,
              private route: ActivatedRoute) {}

  ngOnInit() {

    this.data_service.get_user().subscribe( user => {

      this.user = user;
      this.loaded = true;
    });

    this.data_service.get_size().subscribe( data => {

      this.songs_size = data.valueOf();
    });
  }

  ngAfterViewInit() {

    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems.item(0), {direction: 'bottom'});
  }

  close() {

    this.sidenav.close();
  }

  logout() {

    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  display_badge() {

    return this.songs_size > 0;
  }
}
