import { Component } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public services = []; 
  public loading = true;
  public search = {
    value: '',
    type: '',
  };
  constructor(
    private api: ApiService,
  ) { }
  ionViewDidEnter() {
    this.searchServices();
  }
  searchServices() {
    this.api.get(`/v1/trampo/search?searchValue=${this.search.value}&serviceType=${this.search.type}`).then(res => {
      this.services = res['services'];
      this.loading = false;
    }).catch(() => { }).finally(() => this.loading = false);
  }
}
