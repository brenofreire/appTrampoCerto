import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardInfoComponent } from './card-info/card-info.component';
import { FormsModule } from '@angular/forms';
import { ServiceItemComponent } from './service-item/service-item.component';
import { ServiceFormComponent } from './service-form/service-form.component';



@NgModule({
  declarations: [
    CardInfoComponent,
    ServiceItemComponent,
    ServiceFormComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    CardInfoComponent,
    ServiceItemComponent,
    ServiceFormComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
