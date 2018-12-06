'use strict';
import { Coluna } from './Coluna';

export class Tabela1 {
  private _colunas: Coluna[];
  private _pk: Coluna[];
  private _nome: String;

  constructor(tabela: Function) {

  }

  public static sync(recriar?: Boolean) {}
  public static listarColunas(): string {
    let resultado: string;

    return '';
  }
}

export function Tabela<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
      newProperty = "new property";
      hello = "override";
  }
}
