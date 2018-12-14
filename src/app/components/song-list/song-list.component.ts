import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input() songs: any;

  constructor() { }

  ngOnInit() {
  }

}
