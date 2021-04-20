import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidandoAcessoPage } from './validando-acesso.page';

const routes: Routes = [
  {
    path: '',
    component: ValidandoAcessoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidandoAcessoPageRoutingModule {}
