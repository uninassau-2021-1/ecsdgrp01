import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dados } from '../models/dados.models';
import { LocalStorage } from '../models/localstorage.models';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  back_URL = 'http://localhost:8082'

  constructor(private http: HttpClient) { }

  login(dados: Dados) {
    return this.http.post(this.back_URL, dados, {
      observe: 'response',
      responseType: 'text',
    })
  }

  bloquear(bloquear: LocalStorage) {
    return this.http.post(`${this.back_URL}/bloquear_usuario`, bloquear, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
