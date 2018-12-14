import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  @Input() albums: any;

  constructor() { }

  ngOnInit() {
  }

}
