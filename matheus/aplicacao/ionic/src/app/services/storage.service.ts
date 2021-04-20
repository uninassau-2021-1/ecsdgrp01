import { Injectable } from '@angular/core';
import { LocalStorage } from '../models/localStorage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getUsuario(usuario: string): LocalStorage {
    let usuarioLocal = localStorage.getItem(usuario);
    if (usuarioLocal == null) {
      return null;
    } else {
      return JSON.parse(usuarioLocal);
    }
  }

  setUsuario(usuarioLocal: LocalStorage): void {
    if (usuarioLocal == null) {
      localStorage.removeItem(usuarioLocal.usuario);
    } else {
      localStorage.setItem(usuarioLocal.usuario, JSON.stringify(usuarioLocal));
    }
  }
}
