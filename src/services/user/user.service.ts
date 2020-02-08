import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage: Storage,
  ) { }

  async createsHomeList(): Promise<any[]> {
    let menu = [];    
    let user = await this.storage.get('tc_user');
    if (user['type'] == 'partner') menu = [{
      title: 'Serviços disponíveis',
      url: '/partner',
      icon: 'home'
    }, {
      title: 'Chat com clientes',
      url: '/partner',
      icon: 'build'
    }]; else menu = [{
      title: 'Solicitar Ajuda',
      url: '/client',
      icon: 'home'
    }, {
      title: 'Chat com prestadores',
      url: '/client',
      icon: 'build'
    }]
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
