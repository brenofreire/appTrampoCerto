import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';
import { GlobalService } from 'src/services/global/global.service';
import { NavController } from '@ionic/angular';

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
    private global: GlobalService,
    private navCtrl: NavController,
  ) { }
  ngOnInit() {
    this.searchServices();
  }
  searchServices() {
    this.api.get(`/v1/trampo/search?searchValue=${this.search.value}&serviceType=${this.search.type}`).then(res => {
      this.services = res['services'];
      this.loading = false;
    }).catch(() => { }).finally(() => this.loading = false);
  }
}
