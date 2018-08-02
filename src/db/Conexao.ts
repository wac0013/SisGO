'use strict';

import { Tabela } from './Tabela';
import * as mysql from 'mysql';
import * as bib from '../lib';
import * as config_bd from '../../config';
import { ErroBanco } from './errosBanco';

class Conexao {
  private _host: string;
  private _porta: number;
  private _banco: string;
  private _usuario: string;
  private _senha: string;
  private _con: mysql.PoolConnection;

  private static _schema: Tabela[];
  private static _pool: mysql.Pool;

  private constructor(con?: mysql.Connection) {
    if (!con) {
      this = Conexao.getConexao();
    } else {
      this._con = con;
    }
  }

  public static getConexao(): Conexao {
    if (!this._pool) {
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

    let retorno: Conexao;

    this._pool.getConnection(function(err, con) {
      if (err) throw new ErroBanco('Erro ao adiquirir conexão!', err);
      retorno = new Conexao(con);
    });

    return retorno;
  }

  public liberar() {
    this._con.release();
  }

  public abrirTransacao(): Promise<void> {
    const obj = this;
    return new Promise(function(sucesso, falha) {
      obj._con.beginTransaction(function(err) {
        if (err) falha(err);
        sucesso();
      });
    });
  }

  public voltarTransacao(): Promise<void> {
    const obj = this;
    return new Promise(function(sucesso, falha) {
      obj._con.rollback(function(err) {
        if (err) falha(err);
        sucesso();
      });
    });
  }

  public concluirTransacao(): Promise<void> {
    const obj = this;
    return new Promise(function(sucesso, falha) {
      obj._con.commit(function(err) {
        if (err) {
          falha(err);
          obj.voltarTransacao();
        }
        sucesso();
      });
    });
  }

  public consultar(sql: string): Promise {
    const obj = this;
    return new Promise(function(sucesso, falha) {
      obj._con.query(sql, function (err, resultado, colunas) {
        
      });
    });
  }
}
