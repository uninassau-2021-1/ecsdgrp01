import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.page.html',
  styleUrls: ['./erro.page.scss'],
})
export class ErroPage implements OnInit {
  errosSemEnviarBackend = new Array();
  errosBackend = new Array();
  status: string;
  mensagem: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((parametros) => {
      if (parametros['errosSemBackend']) {
        this.errosSemEnviarBackend = parametros['errosSemBackend'];
      }
      if (parametros['status']) {
        this.status = parametros['status'];
      }
      if (parametros['mensagem']) {
        this.mensagem = parametros['mensagem'];
      }
      if (parametros['errosBackend']) {
        this.errosBackend = parametros['errosBackend'];
      }
    });
  }

  home() {
    this.router.navigate(['/']);
  }
}
