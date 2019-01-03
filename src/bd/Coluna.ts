import { tp_banco } from "./Conexao";

'use strict';

export interface IFK{
  nome_coluna_ref: string,
  nome_tabela_ref: string
}

export interface IColuna {
  nome?: string,
  pk?:Boolean,
  fk?: IFK,
  tp_banco?: tp_banco,
  nulo?: Boolean,
  valor_padrao?: any
}

export class Coluna implements IColuna{
  private _nome_atrib: string;
  private _nome: string;
  private _tipo_banco: tp_banco;
  private _null: Boolean;
  private _valor_padrao: any;
  private _valor: any;

  constructor(nome_atrib: string, nome: string, tp_banco: tp_banco, nulo?: Boolean, padrao?: any) {
    this._nome_atrib = nome_atrib.toLowerCase();
    this._nome = nome.toLowerCase();
    this._tipo_banco = tp_banco;
    this._null = nulo || false;
  }

  public get nome_atrib(): string {
    return this._nome;
  }

  public get nome(): string {
    return this._nome;
  }

  public get valor(): any {
    return this._valor ? this._valor : this._valor_padrao
  }

  public set valor(v: any) {
    this._valor = v;
  }

  public get is_null(): Boolean{
    return this._valor ? false : true;
  }
}

export class Chave_Estrangeira {
  private _nome: string = '';
  private _colunas: Coluna[];
  private _tabela_referencia: any;
  private _tabela: any;
}
