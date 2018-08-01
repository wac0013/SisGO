'use strict';

export enum SimNao {
  sim: true = 'sim',
  nao: false = 'não'
}

export function removerCaracteresEspeciais(s: string) {
  return s.replace([
    '&',
    '°',
    '´',
    '#',
    '@',
    '%',
    '\n',
    '\n\r',
    '~',
    '?',
    '\\',
    '|',
    '€',
    '$',
    '^',
    '{',
    '}',
    '*',
    '.',
    '-',
    '>',
    '<'
  ], '');
}
