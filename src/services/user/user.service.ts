import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage: Storage,
  ) { }

  async createsHomeList() {
    let menu = {};    
    let user = await this.storage.get('tc_user');
    if (user['type'] == 'partner') menu = {
      title: 'Serviços',
      url: '/partner',
      icon: 'home'
    }; else menu = {
      title: 'Solicitar Ajuda',
      url: '/client',
      icon: 'home'
    }
    return menu;
  }
  async createsHomeRoute(){
    let route = {};    
    let user = await this.storage.get('tc_user');
    if (user['type'] == 'partner') route = '/partner';
    else route = '/client';
    return route;
  }
}
