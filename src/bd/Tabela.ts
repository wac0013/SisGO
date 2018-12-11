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

export function Tabela(arg?: Object) {
  return function (classe: any) {
    var original = classe;

    // a utility function to generate instances of a class
    function construct(constructor, args) {
      var c: any;
      c = function() {
        return constructor.apply(this, args);
      }

      c.prototype = constructor.prototype;
      return new c();
    }

    // the new constructor behaviour
    var f = function(...args): any {
      console.log("New: " + original.name);
      return construct(original, args);
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
  }
}
