import { Component, OnInit, Output } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-downloader',
  templateUrl: './web-downloader.component.html',
  styleUrls: ['./web-downloader.component.scss']
})
export class WebDownloaderComponent implements OnInit {

  value = '';

  private current_tab = 'playlists';
  private hash: any = { access_token: localStorage.getItem('access_token'), refresh_token: '' };
  options: any = { playlists: {data: [], last_seen: ''}, songs: {data: [], last_seen: ''},
                          albums: {data: [], last_seen: ''}, artists: {data: [], last_seen: ''} };
  private timer = null;

  constructor(private service: SpotifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }

  get_songs() {

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

      if (this.value !== '') {

        this.service.get_songs(this.hash.access_token, this.value, this.current_tab).subscribe( data => {

          console.log(this.current_tab, data['items']);

          this.options[this.current_tab].data = data['items'];
          this.options[this.current_tab].last_seen = this.value;

        });
      }
    }, 1000);
  }

  tab_changed(event) {

    this.current_tab = event.tab.textLabel.toLowerCase();

    if (this.options[this.current_tab].last_seen !== this.value) {

      this.service.get_songs(this.hash.access_token, this.value, this.current_tab).subscribe( data => {

        this.options[this.current_tab].last_seen = this.value;
        this.options[this.current_tab].data = data['items'];

        console.log(this.current_tab, data['items']);

      });
    }
  }

  has_values() {

    return (this.options[this.current_tab].data.length > 0);
  }

}
