import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor(public snackbar: MatSnackBar) { }

  private user_source = (!!localStorage.getItem('user')) ? new BehaviorSubject<Object>(JSON.parse(localStorage.getItem('user')))
                                                         : new BehaviorSubject<Object>({});

  private to_download_songs = new BehaviorSubject<Array<Object>>([]);
  private to_download_albums = new BehaviorSubject<Array<Object>>([]);
  private to_download_playlists = new BehaviorSubject<Array<Object>>([]);
  private size = new BehaviorSubject<Number>(0);

  user$ = this.user_source.asObservable();
  to_download_songs$ = this.to_download_songs.asObservable();
  to_download_albums$ = this.to_download_albums.asObservable();
  to_download_playlists$ = this.to_download_playlists.asObservable();
  size$ = this.size.asObservable();

  add_user(user: Object) {

    this.user_source.next(user);
  }

  get_user(): Observable<Object> {

    return this.user$;
  }

  add_song(song: Object) {

    this.to_download_songs.next([...this.to_download_songs.getValue(), song]);
    this.size.next(this.size.getValue().valueOf() + 1);
  }

  add_album(album: Object) {
    
    this.to_download_albums.next([...this.to_download_albums.getValue(), album]);
    this.size.next(this.size.getValue().valueOf() + album.tracks.items.length);
  }

  add_playlist(playlist: Object) {
    
    this.to_download_playlists.next([...this.to_download_playlists.getValue(), playlist]);
    this.size.next(this.size.getValue().valueOf() + playlist.tracks.length);
  }

  get_songs(): Observable<Array<Object>> {

    return this.to_download_songs$;
  }

  get_albums(): Observable<Array<Object>> {

    return this.to_download_albums$;
  }

  get_playlists(): Observable<Array<Object>> {

    return this.to_download_playlists$;
  }

  get_size(): Observable<Number> {

      return this.size$;
  }

  openSnackBar(to_download) {

    const message = `${to_download.name} has been added to download`;

    if (to_download.type === 'track') {
      
      this.add_song(to_download);

    } else if (to_download.type === 'album') {

      this.add_album(to_download);

    } else if (to_download.type === 'playlist') {
      
      this.add_playlist(to_download);
    }

    this.snackbar.open(message, '', {
      duration: 2000,
      panelClass: ['grey-snackbar']
    });
  }
}
