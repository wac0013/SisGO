'use strict';

/**
 *
 * @param {*} listaClasses                lista de valores (string ou boolean)
 * Retorna uma string com a lista concatenada de valores passados como parâmetro
 */
export const classes = function(...listaClasses) {
  return listaClasses
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

export const getEventoTeminoAnimacao = function() {
  // eslint-disable-next-line no-undef
  return window && window.webkitAnimationEnd ? 'webkitAnimationEnd' : 'animationend';
};

export function getAlinhamentoTexto(align) {
  return align && (align === 'justify' ? 'justified' : `${align} aligned`);
}
