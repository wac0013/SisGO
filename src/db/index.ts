import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';

export class Conexao {
  private _bd: string;
  private _porta: number;
  private _host: string;
  private _usuario: string;
  private _senha: string;
  private _seq: Sequelize;

  constructor() {
    this._bd = process.env.BD || 'sisgo';
    this._host = process.env.BD_HOST || 'localhost';
    this._porta = Number(process.env.BD_PORTA) || 3306;
    this._usuario = process.env.BD_USUARIO || 'sisgo';
    this._senha = process.env.BD_SENHA || 'DADOS';

    this._seq = new Sequelize({
      database: this._bd,
      host: this._host,
      port: this._porta,
      dialect: 'mysql',
      username: this._usuario,
      password: this._senha,
      pool: {
        min: 1,
        max: 10,
        idle: 1000 * 60, // 1 min para aguardar uma conexão
        acquire: 1000 * 60 * 2 // 2 min para tentar criar uma nova conexão
      },
      modelPaths: [path.join(__dirname, '../model')]
    });
  }

}
