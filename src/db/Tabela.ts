'use strict';
import { Coluna } from './Coluna';

export class Tabela {
  private static _colunas: Coluna[];

  constructor() {}

  public static sync(recriar?: Boolean) {}
  public static listarColunas(): string {
    let resultado: string;

    this._colunas.forEach((coluna, i) => {
      resultado = resultado + coluna
    })
  }
}
