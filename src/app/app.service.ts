import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) { }

    get_login() {

        return this.http.get('/login');
    }
}
