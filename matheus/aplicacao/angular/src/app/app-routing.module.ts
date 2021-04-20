import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tela0001Component } from './componentes/tela0001/tela0001.component';
import { Tela0002Component } from './componentes/tela0002/tela0002.component';
import { Tela0003Component } from './componentes/tela0003/tela0003.component';
import { Tela0004Component } from './componentes/tela0004/tela0004.component';
import { Tela0005Component } from './componentes/tela0005/tela0005.component';

const routes: Routes = [
  {
    path: '',
    component: Tela0001Component,
  },
  {
    path: 'validando_acesso',
    component: Tela0002Component,
  },
  {
    path: 'erro_login',
    component: Tela0003Component,
  },
  {
    path: 'login_bloqueado',
    component: Tela0004Component,
  },
  {
    path: 'inicio',
    component: Tela0005Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
