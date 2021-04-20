import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuarioLogado: string;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('usuarioLogado')) {
      this.usuarioLogado = localStorage.getItem('usuarioLogado');
      this.router.navigate(['/inicio']);
    }
  }

  sair(){
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogado = '';
    this.router.navigate(['/']);
  }

}
