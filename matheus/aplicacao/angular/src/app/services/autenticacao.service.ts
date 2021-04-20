import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dados } from '../models/dados.model';
import { LocalStorage } from '../models/localStorage.model';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  API_URL = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  autorizacao(dados: Dados) {
    return this.http.post(this.API_URL, dados, {
      observe: 'response',
      responseType: 'text',
    });
  }

  bloquearUsuario(bloquear: LocalStorage) {
    return this.http.post(`${this.API_URL}/bloquear_usuario`, bloquear, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
