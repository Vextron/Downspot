import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { DataShareService } from '../../services/data-share.service';

import * as M from '../../../assets/materialize.min.js';
@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})

export class ArtistDetailComponent implements OnInit, AfterViewInit {

  artist_detail: any;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {

    this.artist_detail = this.route.snapshot.data.artist_data;
  }

  ngAfterViewInit() {

    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, {});
  }

  details(id) {

    this.router.navigate(['navigation/artist', id]);
  }

}
