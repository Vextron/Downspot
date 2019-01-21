import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: SpotifyService, private router: Router,
              private data_service: DataShareService) { }

  ngOnInit() {

    this.route.queryParams.subscribe( params => {

      const access_code = params['code'];

      this.service.get_token(access_code).subscribe( data => {

        const hash = data['res'].substring(1).split('&').reduce(function (initial, item) {

          if (item) {

            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }

          return initial;
        }, {});

        localStorage.setItem('access_token', hash.access_token);

        this.service.get_auth_user_profile(localStorage.getItem('access_token')).subscribe( user => {

          this.data_service.add_user(user);

          localStorage.setItem('user', JSON.stringify(user));

          this.router.navigate(['navigation']);
        });
      });
    });
  }

}
