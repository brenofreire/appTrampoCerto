import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
})
export class ServiceFormComponent implements OnInit {
  private service = {
    title: '',
    type: '',
    id_user: null,
  }
  @Input('showForm') showForm: boolean;
  @Input('services_types') services_types: Array<object>;
  @Output('initializeService') initializeServiceOut = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  initializeService(){
    this.initializeServiceOut.emit(this.service)
  }
}
