import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dados } from '../models/dados.model';
import { LocalStorage } from '../models/localStorage.model';
import { AutenticacaoService } from '../services/autenticacao.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dados: Dados;
  localStorage: LocalStorage;
  usuarioLogado: string;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.dados = {
      usuario: 'abcdefgh',
      senha: '12345678',
    };
    this.localStorage = {
      usuario: '',
      tentativas: null,
      tempoFinal: null,
    };
  }

  ngOnInit() {
    if (localStorage.getItem('usuarioLogado')) {
      this.usuarioLogado = localStorage.getItem('usuarioLogado');
      this.router.navigate(['/inicio']);
    }
  }

  login() {
    const erros = new Array();

    if (this.dados.usuario.length === 0) {
      erros.push('O campo usuário é obrigatório.');
    }
    if (this.dados.usuario.length < 8) {
      erros.push('O campo usuário precisa ter no mínimo 8 caracteres.');
    }
    if (this.dados.senha.length === 0) {
      erros.push('O campo senha é obrigatório.');
    }
    if (this.dados.senha.length < 8) {
      erros.push('O campo senha precisa ter no mínimo 8 caracteres.');
    }

    if (erros.length === 0) {
      this.router.navigate(['/validando_acesso']);

      setTimeout(() => {
        this.autenticacaoService.autorizacao(this.dados).subscribe(
          (response) => {
            if (response.status === 200) {
              localStorage.setItem('usuarioLogado', this.dados.usuario);
              this.ngOnInit();
            }
          },
          (erro) => {
            switch (erro.status) {
              case 401:
                this.router.navigate(['/erro'], {
                  queryParams: {
                    status: erro.status,
                    mensagem: 'Senha inválida',
                  },
                });

                if (
                  !localStorage.getItem(this.dados.usuario) ||
                  Date.now() >
                    this.storageService.getUsuario(this.dados.usuario)
                      .tempoFinal
                ) {
                  this.localStorage = {
                    usuario: this.dados.usuario,
                    tempoFinal: Date.now() + 300000,
                    tentativas: 1,
                  };

                  this.storageService.setUsuario(this.localStorage);
                } else if (
                  this.storageService.getUsuario(this.dados.usuario) &&
                  Date.now() <=
                    this.storageService.getUsuario(this.dados.usuario)
                      .tempoFinal
                ) {
                  const usuarioLocal = this.storageService.getUsuario(
                    this.dados.usuario
                  );
                  usuarioLocal.tentativas++;
                  this.storageService.setUsuario(usuarioLocal);
                }

                if (
                  this.storageService.getUsuario(this.dados.usuario)
                    .tentativas === 3
                ) {
                  this.autenticacaoService
                    .bloquearUsuario(
                      this.storageService.getUsuario(this.dados.usuario)
                    )
                    .subscribe(
                      (response) => {
                        if (response.status === 200) {
                          this.router.navigate(['/erro'], {
                            queryParams: {
                              status: 403,
                              mensagem:
                                'Usuário Bloqueado!',
                            },
                          });
                        }
                      },
                      (error) => {
                        if (error.status === 404) {
                          this.router.navigate(['/erro'], {
                            queryParams: {
                              status: error.status,
                              mensagem:
                                'Usuário inexistente na nossa base de dados!',
                            },
                          });
                        }
                      }
                    );
                  localStorage.removeItem(this.dados.usuario);
                }
                break;
              case 403:
                this.router.navigate(['/erro'], {
                  queryParams: {
                    status: erro.status,
                    mensagem:
                      'Usuário Bloqueado!',
                  },
                });
                break;
              case 404:
                this.router.navigate(['/erro'], {
                  queryParams: {
                    status: erro.status,
                    mensagem:
                      'Usuário inexistente na nossa base de dados!',
                  },
                });
                break;
              case 422:
                const errosBackend = erro.error
                  .replace('["', '')
                  .replace('"]', '')
                  .split('","');
                  this.router.navigate(['/erro'], {
                    queryParams: {
                      status: erro.status,
                      mensagem:
                        'Por gentileza corrija esse(s) erro(s) e tente novamente:',
                      errosBackend,
                    },
                  });
                break;
            }
          }
        );
      }, 3000);
    } else {
      this.router.navigate(['/erro'], {
        queryParams: { errosSemBackend: erros },
      });
    }
  }
}
