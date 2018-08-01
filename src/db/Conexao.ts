'use strict';

import { Tabela } from './Tabela';
import * as mysql from 'mysql';
import * as bib from '../lib';
import * as config_bd from '../../config';
import { ErroBanco } from './errosBanco';

class Conexao {
  private _pool: mysql.Pool;
  private _host: string;
  private _porta: number;
  private _banco: string;
  private _usuario: string;
  private _senha: string;

  private static _schema: Tabela[];
  private static _con: Conexao;

  private static getConexao(): Conexao {
    if (!this._con) {
      try {
        this._con = new Conexao();
      } catch (error) {
        throw new ErroBanco(error);
      }

      this._schema = [];
    }

    return this._con;
  }

  private constructor() {
    this._pool = mysql.createPool({
      host: config_bd.host || 'localhost',
      port: config_bd.porta || 3306,
      database: config_bd.nome_bd || 'sisgo',
      user: config_bd.usuario || 'sisgo',
      password: config_bd.senha || 'DADOS',
      queueLimit: config_bd.pool.max_fila || 10, // número máximo de conexões na fila de espera do pool
      connectionLimit: config_bd.pool.max || 20, // número máximo de conexão do pool
      acquireTimeout: config_bd.pool.timeout_nova_conexao || 30000,
      timeout: config_bd.timeout || 60000,
      typeCast: false,
      charset: config_bd.charset || 'UTF-8_GENERAL_CLI',
      timezone: config_bd.timezone || 'America/Sao_Paulo',
    });
  }

  public static iniciarTransacao(processamento: Function): Promise {
    const con: Conexao;
    return new Promise((sucesso, falha) => {
      con = this.getConexao();
      con._pool.getConnection((erro, conexao) => {
        if (erro) falha(erro);

        conexao.beginTransaction((err) => {
          if (err) falha(err);
          try {
            processamento(conexao);
            conexao.commit();
            sucesso(con);
          } catch (error) {
            conexao.rollback();
            falha(error);
          }
        });
      });
    });
  }
}
