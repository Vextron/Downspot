import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // private endpoint = 'http://localhost:4200/api';
  // NOTE: Production only
  private endpoint = '';

  constructor(private http: HttpClient) { }

  get_info(song) {

    const params = new HttpParams().set('name', song.name).set('artist', song.artists[0].name);

    return this.http.get(this.endpoint + '/download_options', {params: params});
  }

  download_song(id, name) {

    const params = new HttpParams().set('video_id', id).set('name', name);

    return this.http.get(this.endpoint + '/download', { params: params, responseType: 'blob'});
  }
}
