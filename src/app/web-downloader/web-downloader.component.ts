import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-web-downloader',
  templateUrl: './web-downloader.component.html',
  styleUrls: ['./web-downloader.component.scss']
})
export class WebDownloaderComponent implements OnInit {

  value = 'Type your song here';

  private access_code: string;
  private hash: any = {access_token: '', refresh_token: ''};
  private songs: any;

  constructor(private spotify: SpotifyService, private route: ActivatedRoute, private service: AppService) { }

  ngOnInit() {

    this.route.queryParams.subscribe( params => {

      this.access_code = params['code'];

      this.service.get_token(this.access_code).subscribe(data => {

        this.hash = data['res'].substring(1).split('&').reduce(function (initial, item) {

          if (item) {

            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }

          return initial;
        }, {});
      });
    });

  }

  get_songs() {

    this.service.get_songs(this.hash.access_token).subscribe( data => {

     this.songs = data.items;
    });
  }

}
