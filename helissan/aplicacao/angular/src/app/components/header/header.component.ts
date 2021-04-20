import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dados } from 'src/app/models/dados.models';
import { LocalStorage } from 'src/app/models/localstorage.models';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  dados: Dados;
  localStorage: LocalStorage;
  usuarioLogado: string

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private storageService: StorageService
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

  ngOnInit(): void {
    if (localStorage.getItem('usuarioLogado')) {
      this.usuarioLogado = localStorage.getItem('usuarioLogado');
      this.router.navigate(['/inicio']);
    }
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogado = ''
    this.router.navigate(['/']);
  }

  login() {
    let erro = new Array()
    if (this.dados.usuario.length === 0) {
      erro.push("Informe o nome de usuário");
    }
    if (this.dados.senha.length === 0) {
      erro.push("Informe a senha");
    }
    if (this.dados.usuario.length < 8) {
      erro.push("O usuário informado deve conter mais de 8 caracteres");
    }
    if (this.dados.senha.length < 8) {
      erro.push("A senha informada deve conter mais de 8 caracteres");
    }
    if (erro.length === 0) {
      this.router.navigate(['/validando']);

      setTimeout(() => {
        this.autenticacaoService.login(this.dados).subscribe(
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
                    mensagem: 'Senha incorreta',
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
                  let usuarioLocal = this.storageService.getUsuario(
                    this.dados.usuario
                  );
                  usuarioLocal.tentativas++;
                  this.storageService.setUsuario(usuarioLocal);
                }

                if (
                  this.storageService.getUsuario(this.dados.usuario)
                    .tentativas == 3
                ) {
                  this.autenticacaoService
                    .bloquear(
                      this.storageService.getUsuario(this.dados.usuario)
                    )
                    .subscribe(
                      (response) => {
                        if (response.status === 200) {
                          this.router.navigate(['/bloqueado']);
                        }
                      },
                      (erro) => {
                        if (erro.status === 404) {
                          this.router.navigate(['/erro'], {
                            queryParams: {
                              status: erro.status,
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
                this.router.navigate(['/bloqueado']);
                break;
              case 404:
                this.router.navigate(['/erro'], {
                  queryParams: {
                    status: erro.status,
                    mensagem: 'Usuário inexistente na nossa base de dados!',
                  },
                });
                break;
              case 422:
                let errosBackend = erro.error.replace('["', '').replace('"]', '').split('","')
                this.router.navigate(['/erro'], {
                  queryParams: { status: erro.status, mensagem: 'Encontramos esses erros, por gentileza corrija-os e tente novamente', errosBackend: errosBackend },
                });
                break;
            }
          }
        );
      }, 3000);

    } else {
      this.router.navigate(['/erro'], { queryParams: { errosSemEnviarBackend: erro } });
    }
  }
}
