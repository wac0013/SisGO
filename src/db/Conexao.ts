import { Tabela } from './Tabela';
import { Drivers, IPool } from './drivers';

class Conexao {
  private _schema: Tabela[];
  private _driver: Drivers;
  private _pool: IPool;
  private _host: string;
  private _porta: number;
  private _banco: string;
  private _usuario: string;
  private _senha: string;

  private static _con: Conexao;

  public static getConexao(): Conexao {
    if (!this._con) {
      this._con = new Conexao();
    }

    return this._con;
  }

  private constructor() {
    this._schema = [];
  }
}
