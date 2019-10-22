import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';
import { GlobalService } from 'src/services/global/global.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private api: ApiService,
    private global: GlobalService,
    private navCtrl: NavController,
  ) { }
  ngOnInit() {}
  
}
