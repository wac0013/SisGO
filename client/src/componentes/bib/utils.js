'use strict';

/**
 *
 * @param {*} listaClasses                lista de valores (string ou boolean)
 * Retorna uma string com a lista concatenada de valores passados como parâmetro
 */
export const classes = function(...listaClasses) {
  listaClasses
    .filter(function(classe) {
      return classe && classe !== true;
    })
    .join(' ');
};

// números usados pelo semantic-ui
const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen'
];

/**
 *
 * @param {*} i             Valor numérico
 * Retorna o número correspondente ao valor informado no parâmetro,
 * caso contrario retorna exatamente o valo pssado no parâmetro
 * ex:
 *    num(1) -> 'one',
 */
export const colunas = function(i) {
  return typeof i === 'number' ? numbers[i - 1] : i;
};

export const estado = {
  ATIVO: 'active',
  desabilitado: 'disabled',
  erro: 'error',
  sucesso: 'success',
  alerta: 'warning'
};

export const tamano = {};

export const cor = {};

export const fixado = { TOP: 'top', BOT: 'bottom' };

export const alinhamento_texto = { ESQUERDA: 'top', DIREITA: 'middle', CENTRO: 'bottom', JUSTIFICADO: 'justify' };

export const alinhamento_vertical = {
  TOP: 'top',
  MID: 'middle',
  BOT: 'bottom'
};

export const SOCIAL = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  GOOGLE: 'goole',
  PLUS: 'google plus',
  VK: 'vk',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  YOUTUBE: 'youtube'
};
/*
Enum.Estado = Enum.Extend(['active', 'disabled', 'error', 'warning', 'success']);
Enum.Tamanho = Enum.Extend(['mini', 'tiny', 'small', 'standard', 'medium', 'large', 'big', 'huge', 'massive']);
Enum.Cor = Enum.Extend(['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']);
Enum.Attached = Enum.Extend(['top', 'bottom']);
Enum.TextAlign = Enum.Extend(['left', 'right', 'center', 'justify']);
Enum.VerticalAlign = Enum.Extend(['top', 'middle', 'bottom']);
Enum.Social = Enum.Extend(['facebook', 'twitter', 'google', 'google plus', 'vk', 'instagram', 'linkedin', 'youtube']);
*/
