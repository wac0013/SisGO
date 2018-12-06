'use strict';

import { Conexao } from '../bd/Conexao';
import { Tabela } from '../bd/Tabela';

export class Usuario{
  private _login: string;
  private _senha: string = '';

  constructor(login: string) {
    this._login = login;
  }

  public get login(): string {
    return this.login;
  }

  public get senha(): string {
    return this._senha;
  }

}
