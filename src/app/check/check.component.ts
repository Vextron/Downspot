import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: AppService, private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe( params => {

      const access_code = params['code'];

      this.service.get_token(access_code).subscribe(data => {

        const hash = data['res'].substring(1).split('&').reduce(function (initial, item) {

          if (item) {

            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }

          return initial;
        }, {});

        localStorage.setItem('access_token', hash.access_token);

        this.router.navigate(['web-downloader']);
      });
    });
  }

}
