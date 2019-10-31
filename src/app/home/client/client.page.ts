import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { TrampoService } from 'src/services/trampo/trampo.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  public services: Array<object> = [];  
  private services_types: Array<object>;
  constructor(
    private global: GlobalService,
    private trampoServ: TrampoService,
  ) { }

  async ngOnInit() {
    this.services_types = <any> await this.trampoServ.getServicesTypes();    
  }
  /**
   * Abre/inicia um serviço
   */
  initializeService(service: {}): void {    
    console.log(this.validateService(service));
    service = this.validateService(service);
    this.services.push({
      title: service['title'],
      type: service['type'],
      status: 'initialized',      
    });    
    // this.trampoServ.initializeService(this.validateService());
  }
  /**
   * @returns Serviço validado e pronto pra fazer a request
   */
  validateService(service): object {
    return {
      title: service.title,
      type: service.type,
      id_user: this.global.get('tc_user')['id']
    }
  }    
}
