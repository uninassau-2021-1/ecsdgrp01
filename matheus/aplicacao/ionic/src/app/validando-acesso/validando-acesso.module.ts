import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidandoAcessoPageRoutingModule } from './validando-acesso-routing.module';

import { ValidandoAcessoPage } from './validando-acesso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidandoAcessoPageRoutingModule
  ],
  declarations: [ValidandoAcessoPage]
})
export class ValidandoAcessoPageModule {}
