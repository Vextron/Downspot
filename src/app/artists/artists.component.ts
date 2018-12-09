import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  @Input() artists: any;

  constructor() { }

  ngOnInit() {
  }

}
