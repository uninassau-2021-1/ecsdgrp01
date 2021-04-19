import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidandoPageRoutingModule } from './validando-routing.module';

import { ValidandoPage } from './validando.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidandoPageRoutingModule
  ],
  declarations: [ValidandoPage]
})
export class ValidandoPageModule {}
