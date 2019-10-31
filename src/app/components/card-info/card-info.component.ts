import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {  

  @Input('hide') hide: any;

  constructor() { }

  ngOnInit() {}

}
