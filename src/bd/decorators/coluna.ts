'use strict';

import { Coluna as Col, IColuna } from "../Coluna";
import { Conexao, tp_banco } from "../Conexao";
import { Tabela } from "../Tabela";

let coluna: IColuna

function zeraValores(){
  coluna = {}
}

function decoratorColuna(target: any, key: string) {
  const classe = target.constructor;
  //para o padrao de variável privada comecar com _, remove-se o _
  const nome_atrib = key[0] == `_` ? key.slice(1): key

  coluna.nome = coluna.nome || nome_atrib;
  coluna.tp_banco = coluna.tp_banco || tp_banco.INT

  classe.tabela = classe.tabela || new Tabela();
  classe.tabela.registraColuna(new Col(key, coluna.nome, coluna.tp_banco));

  function getter(): any{
    return target[`_${key}`]
  }

  function setter(valor: any) {
    target[`_${key}`] = valor
  }

  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
};

export function Coluna(info?: IColuna) {
  zeraValores()

  if (info) {
    coluna.nome = info.nome;
    coluna.tp_banco = info.tp_banco;
  }

  return decoratorColuna
}

export function PKColuna(info?: IColuna) {
  zeraValores()

  coluna.pk = true;

  if (info) {
    coluna.nome = info.nome;
    coluna.tp_banco = info.tp_banco;
  }

  return decoratorColuna
}

export function PKColunaAutoIncrement(info?: IColuna) {
  zeraValores()

  coluna.tp_banco = tp_banco.BIGINT;

  if (info) {
    coluna.nome = info.nome;
  }

  return decoratorColuna
}