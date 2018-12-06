'use strict';

import { Conexao } from '../bd/Conexao';
import { Tabela } from '../bd/Tabela';

@Tabela
export class Versao {
  private _id_versao: number = 0;
  private _major: number = 0;
  private _minor: number = 0;
  private _patch: number = 0;
  private _build: number = 0;
  private _extensao: string = ''
  private _ativa: string = ''

  constructor() {
  }

  public id_versao(): number {
    return this._id_versao
  }

  public numero_versao(): string {
    if (this._build > 0) {
      return `${this._major}.${this._minor}.${this._patch}.${this._build}${this._extensao}`
    } else {
      return `${this._major}.${this._minor}.${this._patch}${this._extensao}`
    }
  }

  public getVersao(): Versao{
    return new Versao()
  }

  static teste(){
    console.log(this)
  }
}
