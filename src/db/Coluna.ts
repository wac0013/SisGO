'use strict';

export class Coluna {
  private _nome: string;
  private _tipo_banco: string;

  constructor(nome: string) {
    this._nome = nome.toLowerCase();
  }

  public get nome(): string {
    return this._nome;
  }
}
