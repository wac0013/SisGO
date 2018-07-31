import { bd } from './index';
import * as seq from 'sequelize';

export interface IColuna {
  nome: string;
  tipo: seq.DataTypes;
}

export function Tabela(nome_tabela?: string) {
  return function(target: Function) {
    const classeOriginal = target;
    const _nome_tabela = nome_tabela ? nome_tabela.toUpperCase() : classeOriginal.name.toUpperCase();


    bd.define(_nome_tabela, {});
  };
}

export function Coluna(info?: IColuna) {
  return (target: Object, key: string) => {
    const valor = this[key];
  };
}
