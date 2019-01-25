import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss']
})
export class PlaylistsPageComponent implements OnInit {

  playlists: any;
  cpy_playlists: any;
 
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.playlists = this.route.snapshot.data.playlists.items;
    this.cpy_playlists = this.playlists;
  }

  on_filter(filtered_list) {

    this.cpy_playlists = filtered_list;
  }

}
