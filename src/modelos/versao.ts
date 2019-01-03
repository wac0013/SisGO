'use strict';

import { Conexao } from '../bd/Conexao';
//import { Tabela } from '../bd/Tabela';
import { Coluna, PKColuna } from '../bd/decorators/coluna';
import {Tabela} from '../bd/decorators/tabela'

@Tabela(`versoes`)
export class Versao {
  @PKColuna()
  private _id_versao: number = 0;
  @Coluna()
  protected _major: number = 0;
  @Coluna()
  private _minor: number = 0;
  @Coluna()
  private _patch: number = 0;
  @Coluna()
  private _build: number = 0;
  @Coluna()
  private _extensao: string = ''
  @Coluna()
  private _ativa: string = ''

  constructor() {

  }

  public get id_versao(): number {
    let a = Conexao.lista_tabelas
    return this._id_versao
  }

  public numero_versao(): string {
    if (this._build > 0) {
      return `${this._major}.${this._minor}.${this._patch}.${this._build}${this._extensao}`
    } else {
      return `${this._major}.${this._minor}.${this._patch}${this._extensao}`
    }
  }

  public static getVersao(): Versao{
    return new Versao()
  }

  public salvar(): Promise<Versao> {
    console.log('salvar local');
    return new Promise(function(sucesso, falha){})
  }

  static teste1(){
    console.log(this)
  }
}
