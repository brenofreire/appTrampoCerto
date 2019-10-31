import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent implements OnInit {
  
  @Input('services') services: Array<object>;
  @Input('hasButton') hasButton: boolean;

  constructor() { }

  ngOnInit() {}

}
