import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { ApiService } from 'src/services/api/api.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public user = {
    name: '',
    email: '',
    password: '',
    type: null,
    accepted: 0,
  }
  public tabActive = 'login';

  constructor(
    private global: GlobalService,
    private api: ApiService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {
    setTimeout(() => {
      let usr = this.global.get('tc_user');
      console.log(usr);
    }, 3000);
  }

  ngOnInit() {

  }
  async register() {
    if(!this.validateForm()) return false;
    let loader = await this.loadingCtrl.create({ message: 'Cadastrando usuário' });
    loader.present();
    let user = JSON.parse(JSON.stringify(this.user));
    user.type = this.user.type ? 'partner' : 'user';
    this.api.post('/register', user).then(result => {
      this.tabActive = 'login';
      this.showToast(result['message']);
    }).catch(err => this.showToast(err['message'])).finally(() => loader.dismiss());
  }
  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      cssClass: 'toast-friendly',
      color: '#375D4C',
      duration: 3000,
    }); toast.present();
  }
  validateForm(){
    if(this.user.name.length < 4) {
      this.showToast('O usuário deve ter ao menos 4 caracteres');
      return false;
    }
    if(this.user.email.length < 8) {
      this.showToast('Email inválido');
      return false;
    }
    if(this.user.password.length < 8) {
      this.showToast('A senha deve ter ao menos 8 carecteres');
      return false;
    }
    return true;
  }
}
