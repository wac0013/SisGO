'use strict';

import { Conexao } from '../bd/Conexao';
import { Tabela } from '../bd/Tabela';

export class Usuario extends Tabela {
  private _login: string;
  private _senha: string = '';

  constructor(login: string) {
    super();
    this._login = login;
  }

  public get login(): string {
    return this.login;
  }

  public get senha(): string {
    return this._senha;
  }

  public static criarTabela(con?: Conexao): Promise<void> {
    const self = this;
    return new Promise(function (sucesso, falha) {
      const sql =
        'create table if not exists ' +
        self.name +
        ' {' +
        'login varchar(20) not null, ' +
        'senha varchar(20) not null default "teste", ' +
        'primary key (login)' +
        '}';

      Conexao.consultar(sql)
        .then(function () {
          sucesso();
        })
        .catch(function (err) {
          falha(err);
        });
    });
  }
}
