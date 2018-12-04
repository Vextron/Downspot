import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private app_service: AppService, private router: Router) { }

  private url: string;

  ngOnInit() {
  }

  login() {

    this.app_service.get_code().subscribe(data => {

      console.log(data);

      window.location.href = data['res'];
    });
  }
}
