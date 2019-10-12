import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public date: any[] = [];

  constructor() { }
  set(key, value) {
    this.date[key] = value;
    return true;
  }
  get(key) {
    console.log(this.date[key]);
    return this.date[key];
  }
}
