import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { Storage } from '@ionic/storage';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:4444'


  constructor(
    private http: HttpClient,
    private storage: Storage,
    private global: GlobalService,
  ) { }

  get(url_dinamica) {
    return new Promise((response, error) => {
      this.headerConstructor('get').then(headers => {
        this.http.get(this.url + url_dinamica, { headers: <any> headers })
          .subscribe(data => response(data), err => console.log(err));
      });
    });
  }
  post(url_dinamica, body) {
    return new Promise((response, error) => {
      this.headerConstructor('post').then(headers => {
        this.http.post(this.url + url_dinamica, body, { headers: <any> headers })
          .subscribe(data => response(data), err => error(err['error']));
      });
    });
  }
  headerConstructor(type) {
    return new Promise(async res => {
      let token = await this.storage.get('tc_token');
      let headers = {
        'authorization': token,
        'Content-Type': 'application/json',
      }
      if (!token) delete headers['authorization'];
      if (type == 'get') delete headers['Content-Type'];
      res(new HttpHeaders(headers));
    })
  }

}
