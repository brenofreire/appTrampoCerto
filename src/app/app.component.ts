import { Component } from '@angular/core';

import { Platform, ModalController, AlertController, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { GlobalService } from 'src/services/global/global.service';
import { IndexPage } from './index/index.page';
import { HomePage } from './home/home.page';
import { UserService } from 'src/services/user/user.service';
import { Routes, Router } from '@angular/router';
import { TrampoService } from 'src/services/trampo/trampo.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private token;
  private user;
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private global: GlobalService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private userServ: UserService,
    private router: Router,
    private trampoServ: TrampoService,
    private evetns: Events,
  ) {
    this.initializeApp();
    this.evetns.subscribe("ev_createsHomeList", async () => await this.createsHomeList());
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      await this.verifyUserSession();
      await this.getServicesTypes();      
    });
  }
  async verifyUserSession() {
    this.user = await this.storage.get('tc_user');
    this.token = await this.storage.get('tc_token');
    if (!this.user) {
      let login = await this.modalCtrl.create({
        component: IndexPage,
        backdropDismiss: false,
      }); login.present();
    } else {
      this.global.set('tc_user', this.user);
      this.global.set('tc_token', this.token);
      this.createsHomeList();
      this.router.navigateByUrl(<any> await this.userServ.createsHomeRoute());
    }
  }
  async createsHomeList(){
    this.appPages = [];
    this.appPages.push(<any> await this.userServ.createsHomeList());
  } 
  async getServicesTypes(){
    let serviceTypes = await this.trampoServ.getServicesTypes();
    this.storage.set('service_types', serviceTypes);
  }
  async logout(){
    let alert = await this.alertCtrl.create({
      header: 'Deseja realmente sair?',
      subHeader: 'Nós vamos sentir sua falta :(',
      buttons: ['Cancelar', {
        text: 'Sair',
        handler: async () => {
          this.storage.set('tc_user', null);
          this.storage.set('tc_token', null);
          let login = await this.modalCtrl.create({
            component: IndexPage,
            backdropDismiss: false,
          }); login.present();
        }
      }]
    }); alert.present();
  }
}
