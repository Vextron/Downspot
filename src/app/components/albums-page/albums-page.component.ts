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
  value = '';

  private timer = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.albums = this.route.snapshot.data.albums_data.items.map( album => album.album);
    this.cpy_albums = this.albums;
  }

  clear() {

    this.value = '';
    this.cpy_albums = this.albums;
  }

  filter() {

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.value !== '') {

        this.cpy_albums = this.albums.filter( artist => artist.name.toLowerCase().startsWith(this.value.toLocaleLowerCase()));

      } else {

        this.cpy_albums = this.albums;
      }

    }, 300);
  }

}
