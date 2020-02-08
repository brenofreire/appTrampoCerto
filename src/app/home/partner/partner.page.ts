import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';
import { GlobalService } from 'src/services/global/global.service';
import { NavController, LoadingController, Events, AlertController } from '@ionic/angular';
import { TrampoService } from 'src/services/trampo/trampo.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.page.html',
  styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements OnInit {
  public services = [];
  public loading = true;
  public search = {
    value: '',
    type: '',
  };
  constructor(
    private api: ApiService,
    private trampoServ: TrampoService,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController,
    private events: Events,
  ) { }
  ngOnInit() {
    this.searchServices();
  }
  searchServices() {
    this.api.get(`/v1/trampo/search?searchValue=${this.search.value}&serviceType=${this.search.type}`).then(res => {
      this.services = res['services'];
      console.log(this.services);      
      this.loading = false;
    }).catch(() => { }).finally(() => this.loading = false);
  }
  async acceptService(id_service: number){
    let alert = await this.alertCtrl.create({
      header: 'Atenção',
      subHeader: `Ao clicar em "entar em contato", você iniciará um chat com o cliente.`,
      message: 'Deseja confirmar ação?',
      buttons: ['Cancelar', {
        text: 'Entrar em contato',
        handler: async () => {
          let loader = await this.loaderCtrl.create({message: 'Iniciando chat com o cliente...'});
          loader.present();        
          this.trampoServ.changeServiceStatus('accepted', id_service)
          .then(() => {})
          .finally(() => loader.dismiss());
        }
      }]
    }); alert.present();
  }
}
