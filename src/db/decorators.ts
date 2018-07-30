import {bd} from './index';

function Tabela(nome_tabela: string) {
  return (target: Function) => {
    const classeOriginal = target;

    function construir(constructor: Function, args: any) {
      const c: any = function() {
        return constructor.apply(this, args);
      };

      c.prototype = constructor.prototype;
      return new c();
    }

    const novaClasse: any = function(...args: any[]) {
      bd.define(nome_tabela || , {});
      return construir(classeOriginal, args);
    };

    novaClasse.prototype = classeOriginal.prototype;

    return novaClasse;
  };
}
