import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { Storage } from '@ionic/storage';
import { GlobalService } from '../global/global.service';

interface User {
  email: string,
  password: string,
}

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
        this.http.get(this.url + url_dinamica, { headers: <any>headers })
          .subscribe(data => response(data), err => {
            if (err.error.err == 'jwt_auth_invalid_token')
              this.relogar().then(() => response(this.get(url_dinamica)));
            else error(err);
          });
      });
    });
  }
  post(url_dinamica, body) {
    return new Promise((response, error) => {
      this.headerConstructor('post').then(headers => {
        this.http.post(this.url + url_dinamica, body, { headers: <any>headers })
          .subscribe(data => response(data), err => {
            if (err.error.err == 'jwt_auth_invalid_token')
              this.relogar().then(() => response(this.post(url_dinamica, body)));
            else error(err['error']);
          });
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
  relogar() {
    return new Promise(async response => {
      this.login({
        email: this.global.get('tc_user')['email'],
        password: atob(await this.storage.get('tc_password')),
      }).then(() => response(true)).catch(() => response(false));
    })
  }
  login(user: User):Promise<any> {
    return new Promise((res, error) => {
      this.post('/login', user).then(result => {
        res(this.setCredenciais(result, user));
      }).catch(err => error(err));
    })
  }
  setCredenciais(result: {}, user: User) {
    this.global.set('tc_user', result['user']);
    this.global.set('tc_password', btoa(user.password));
    this.storage.set('tc_user', result['user']);
    this.storage.set('tc_token', result['token']);
    this.storage.set('tc_password', btoa(user.password));
  }
}
