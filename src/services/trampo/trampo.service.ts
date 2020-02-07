import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TrampoService {

  constructor(
    private api: ApiService,
  ) { }
  /**
   * @description Role == partner
   * @param status Tipo para qual vai mudar o serviço
   * @param id_service Id do serviço que vai ser alterado
   */
  async changeServiceStatus(status: string, id_service: number): Promise<any> {
    return await this.api.get(`/v1/trampo/${status}/${id_service}`);
  }
  /**
   * @param service Informações sobre serviço: titulo, categoria e id_user
   * @returns Situação da criação do serviço
   */
  async initializeService(service: {}): Promise<any> {
    try { return await this.api.post('/v1/trampo/create', service); }
    catch(e) {
      console.log(e);
      
    }
  }
  /**
   * @returns Tipos de serviços(categorias) cadastrados no banco
   */
  async getServicesTypes() {
    return await this.api.get('/trampo/services_types');
  }
}
