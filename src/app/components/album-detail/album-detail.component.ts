import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  details: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.details = this.route.snapshot.data.album_tracks;

    console.log(this.details);
  }

  get_artist(id) {

    this.router.navigate(['navigation/artist', id]);
  }

}
