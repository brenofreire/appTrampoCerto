import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TrampoService {

  constructor(
    private api: ApiService,
  ) { }
  async changeServiceStatus(status: string, id_service: number){
    return await this.api.get(`v1/trampo/${status}/${id_service}`);
  }
}
