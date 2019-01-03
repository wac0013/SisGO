'use strict';
import { Coluna, Chave_Estrangeira as FK } from './Coluna';
import {Conexao} from './Conexao'
import { stringify } from 'querystring';

export class Tabela {
  private _colunas: Coluna[] = [];
  private _pk: Coluna[] = [];
  private _fk: FK[] = [];
  private _nome: string;
  private _registrada: Boolean = false


  private get sql_base(): string {
    return `select ${this.lista_colunas} from ${this._nome}`
  }

  public registrarTabela(nome: string){
    this._nome = nome;
    this._registrada = true;
    Conexao.registrarTabela(this);
  }

  public static sync(recriar?: Boolean) {}
  public static listarColunas(): Array<string> {
    let resultado: string;

    return [];
  }

  private get lista_colunas(): string {
    let resultado: string = ``;
    this._colunas.forEach(function(col){
      resultado += ` ${col.nome},`
    })

    resultado = resultado.substr(0, resultado.lastIndexOf(`,`));

    return resultado
  }

  public get nome(): string {
    return this._nome;
  }

  public registraColuna(col: Coluna) {
    this._colunas.push(col)
  }

  private colunasToObjeto(): any{
    return this
  }

  private insertOuUpdate(con: Conexao): Promise<string> {
    let self = this;

    return new Promise(function(sucesso, falha){
      con.consultar(`select count(*) from (${self.sql_base})`)
        .then(function(res){
          if (res) {
            sucesso(self.montarUpdate())
          } else {
            sucesso(self.montarInsert())
          }
        })
        .catch((err => falha(err)))
    });
  }

  private montarConsulta(): string {
    return `${this.sql_base}`
  }

  private montarUpdate(): string {
    return ``
  }

  private montarInsert(): string {
    return ``
  }

  private montarDelete(): string {
    return ``
  }

  public buscarUm(): Promise<any>{
    return new Promise(function(sucesso, falha){

    })
  }

  public salvar(conexao?: Conexao): Promise<any> {
    const self = this

    return new Promise(function(sucesso, falha){
      if (conexao) {
        conexao.consultar(``)
          .then(function (resultado) {
            sucesso()
          })
          .catch(err => falha(err))
      } else {
        Conexao.abrirTransacao()
          .then(function(con) {
            self.salvar(con)
              .then(sucesso)
              .catch(err => falha(err))
          })
      }
    })

  }
}

