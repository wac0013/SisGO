'use strict';

import { Tabela } from './Tabela';
import * as mysql from 'mysql';
import * as bib from '../lib';
import { ErroBanco } from './errosBanco';

export class Conexao {
  private _con: mysql.PoolConnection | null | undefined = null;

  private static _schema: Tabela[];
  private static _pool: mysql.Pool;
  private static _conexao: Conexao = new Conexao();

  constructor(conexao?: mysql.PoolConnection) {
    const config_bd = require('../../config/db_conf.json');
    const self = this;

    if (!Conexao._pool) {
      try {
        Conexao._pool = mysql.createPool({
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
          timezone: config_bd.timezone || 'America/Sao_Paulo'
        });
      } catch (error) {
        throw new ErroBanco('Não foi possível criar pool de conexções', error);
      }
    }

    if (conexao) {
      this._con = conexao;
    }
  }

  private static getConexao(): Promise<mysql.PoolConnection> {
    return new Promise(function(sucesso, falha) {
      Conexao._pool.getConnection(function(err, con) {
        if (err) falha(err);
        sucesso(con);
      });
    });
  }

  public static abrirTransacao(): Promise<Conexao> {
    const self = this;
    return new Promise(function(sucesso, falha) {
      self.getConexao().then(function(con) {
        con.beginTransaction(function(err) {
          if (err) falha(err);
          try {
            sucesso(new Conexao(con));
            con.commit(function(erro) {
              if (erro) falha(erro);
            });
          } catch (error) {
            con.rollback(function(erro) {
              if (erro) falha(erro);
            });
          } finally {
            con.release();
          }
        });
      });
    });
  }

  public static consultar(consulta: string, valores?: any[]): Promise<any> {
    const self = this;

    return new Promise(function(sucesso, falha) {
      self.getConexao().then(function(con) {
        con.query(consulta, valores, function(err, res, col) {
          if (err) falha(err);
          sucesso();
        });
      });
    });
  }

  public liberar() {
    if (this._con) con.release();
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

  public consultar(sql: string): Promise<any> {
    const obj = this;
    return new Promise(function(sucesso, falha) {
      obj._con.query(sql, function(err, res, col) {
        if (err) falha(err);
        sucesso({
          resultado: res,
          colunas: col
        });
      });
    });
  }

  public get status(): string {
    return this._con.state;
  }
}
