import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { Storage } from '@ionic/storage';
import { GlobalService } from '../global/global.service';
import { UserService } from '../user/user.service';
import { Events } from '@ionic/angular';

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
    private events: Events,
  ) { }

  get(url_dinamica) {
    return new Promise((response, error) => {
      this.headerConstructor('get').then(headers => {
        this.http.get(this.url + url_dinamica, { headers: <any>headers })
          .subscribe(data => response(data), err => {
            if (err.error && err.error.err == 'jwt_auth_invalid_token')
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
            if (err.error && err.error.err == 'jwt_auth_invalid_token')
              this.relogar().then(() => response(this.post(url_dinamica, body)));
            else error(err);
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
      this.post('/login', user).then((result: any) => {
        this.setCredenciais(result, user).then(() => this.events.publish("ev_createsHomeList"));
        res(result.user.type === "user" ? "client" : "partner");
      }).catch(err => error(err));
    })
  }
  setCredenciais(result: {}, user: User) {
    return new Promise(res => {
      this.global.set('tc_user', result['user']);
      this.global.set('tc_password', btoa(user.password));
      this.storage.set('tc_user', result['user']);
      this.storage.set('tc_token', result['token']);
      this.storage.set('tc_password', btoa(user.password));
      res();
    })
  }
}
