import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor(public snackbar: MatSnackBar) { }

  private user_source = (!!localStorage.getItem('user')) ? new BehaviorSubject<Object>(JSON.parse(localStorage.getItem('user')))
                                                         : new BehaviorSubject<Object>({});
  private to_download = new BehaviorSubject<Array<Object>>([]);

  user$ = this.user_source.asObservable();
  to_download$ = this.to_download.asObservable();

  add_user(user: Object) {

    this.user_source.next(user);
  }

  get_user(): Observable<Object> {

    return this.user$;
  }

  add_song(song: Object) {

    this.to_download.next([...this.to_download.getValue(), song]);
  }

  get_songs(): Observable<Array<Object>> {

    return this.to_download$;
  }

  openSnackBar(song) {

    const message = `${song.name} has been added to download`;

    this.snackbar.open(message, '', {
      duration: 2000,
      panelClass: ['grey-snackbar']
    });

    this.add_song(song);
  }
}
