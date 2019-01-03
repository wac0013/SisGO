'use strict';

import { Conexao } from "../Conexao";
import { Coluna } from "../Coluna";
import { Tabela as Modelo } from '../Tabela'

export function Tabela(nm_tabela?: string) {
  return function(target: any) {
    const classeOriginal = target;
    const _nm_tabela = nm_tabela ? nm_tabela.toUpperCase() : classeOriginal.name.toUpperCase();
    classeOriginal.tabela.registrarTabela(nm_tabela);

    return classeOriginal
  };
}
