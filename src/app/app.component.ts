import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { GlobalService } from 'src/services/global/global.service';
import { IndexPage } from './index/index.page';
import { HomePage } from './home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private global: GlobalService,
    private modalCtrl: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      await this.verifyUserSession();
    });
  }
  async verifyUserSession() {
    let user = await this.storage.get('tc_user');    
    let token = await this.storage.get('tc_token');    
    if (!user) {
      let login = await this.modalCtrl.create({
        component: IndexPage,
        backdropDismiss: false,
      }); login.present();
    } else {
      this.global.set('tc_user', user);
      this.global.set('tc_token', token);
    }
  }
}
