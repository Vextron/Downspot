import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  get_info(song) {

    const params = new HttpParams().set('name', song.name).set('artist', song.artists[0].name);

    return this.http.get('http://localhost:4200/api/download_options', {params: params});
  }
}
