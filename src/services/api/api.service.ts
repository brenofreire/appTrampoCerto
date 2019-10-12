import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:4444'

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }
  
  get(url_dinamica) {
    return new Promise((response, error) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'api-legiao-123123123'
      });
      this.http.get(this.url + url_dinamica, { headers })
      .subscribe(data => response(data), err => console.error(err));
    });
  }
  post(url_dinamica, body) {
    return new Promise((response, error) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.http.post(this.url + url_dinamica, body, { headers })
      .subscribe(data => response(data), err => error(err['error']));
    });
  }
}
