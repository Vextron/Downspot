import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss']
})
export class PlaylistsPageComponent implements OnInit {

  private timer = null;

  playlists: any;
  cpy_playlists: any;
  value = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.playlists = this.route.snapshot.data.playlists.items;
    this.cpy_playlists = this.playlists;
  }

  clear() {

    this.value = '';
    this.cpy_playlists = this.playlists;
  }

  filter() {

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.value !== '') {

        this.cpy_playlists = this.playlists.filter( artist => artist.name.toLowerCase().startsWith(this.value.toLocaleLowerCase()));

      } else {

        this.cpy_playlists = this.playlists;
      }

    }, 300);
  }

}
