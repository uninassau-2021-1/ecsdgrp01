import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tela0003',
  templateUrl: './tela0003.component.html',
  styleUrls: ['./tela0003.component.sass']
})

export class Tela0003Component implements OnInit {
  errosSemEnviarBackend = new Array();
  errosBackend = new Array();
  status: string;
  mensagem: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(parametros => {

      if (parametros['errosSemEnviarBackend']) {
        this.errosSemEnviarBackend = parametros['errosSemEnviarBackend']
      }
      if (parametros['errosBackend']) {
        this.errosBackend = parametros['errosBackend']
      }
      if (parametros['status']) {
        this.status = parametros['status'];
      }
      if (parametros['mensagem']) {
        this.mensagem = parametros['mensagem'];
      }
  });
  }
}
