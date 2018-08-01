'use strict';

import { Tabela, Coluna } from '../db/decorators';

@Tabela()
class Usuario {
  @Coluna() private _login: string;

  constructor(login: string) {
    this._login = login;
  }
}
