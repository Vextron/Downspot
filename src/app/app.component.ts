import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'down-spot';

    constructor(private app_service: AppService) {

    }

    login() {

      this.app_service.get_login().subscribe(data => {

        console.log(data);
      });
    }
}
