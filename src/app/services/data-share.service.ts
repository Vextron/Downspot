import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  private user_source = new BehaviorSubject<any>({});

  user$ = this.user_source.asObservable();

  add_user(user: any) {

    this.user_source.next(user);
  }

  get_user() {

    return this.user$;
  }
}
