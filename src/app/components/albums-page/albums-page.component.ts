import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.scss']
})
export class AlbumsPageComponent implements OnInit {

  albums: any;
  cpy_albums = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.albums = this.route.snapshot.data.albums_data.items.map( album => album.album);
    this.cpy_albums = this.albums;
  }

  on_filter(filtered_list) {

    this.cpy_albums = filtered_list;
  }

}
