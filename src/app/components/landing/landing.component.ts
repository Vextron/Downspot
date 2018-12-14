import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private app_service: SpotifyService, private router: Router) { }

  private url: string;

  ngOnInit() {

    if (!!localStorage.getItem('access_token')) {

      this.router.navigate(['navigation']);
    }
  }

  login() {

    this.app_service.get_code().subscribe(data => {

      console.log(data);
      window.location.href = data['res'];
    });
  }
}
