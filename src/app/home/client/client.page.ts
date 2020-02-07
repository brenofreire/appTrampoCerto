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
    this.trampoServ.initializeService(this.validateService(service));
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
