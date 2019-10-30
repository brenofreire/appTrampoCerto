import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global/global.service';
import { TrampoService } from 'src/services/trampo/trampo.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  private service = {
    title: '',
    type: '',
    id_user: null,
  }
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
  initializeService(): void {
    console.log(this.validateService());    
    // this.trampoServ.initializeService(this.validateService());
  }
  /**
   * @returns Serviço validado e pronto pra fazer a request
   */
  validateService(): object {
    return {
      title: this.service.title,
      type: this.service.type,
      id_user: this.global.get('tc_user')['id']
    }
  }    
}
