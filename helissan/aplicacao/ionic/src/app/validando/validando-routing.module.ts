import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidandoPage } from './validando.page';

const routes: Routes = [
  {
    path: '',
    component: ValidandoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidandoPageRoutingModule {}
