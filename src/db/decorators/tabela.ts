'use strict';

export function Tabela(nome_tabela?: string) {
  return function(target: Function) {
    const classeOriginal = target;
    const _nome_tabela = nome_tabela ? nome_tabela.toUpperCase() : classeOriginal.name.toUpperCase();

    bd.define(_nome_tabela, {});
  };
}
