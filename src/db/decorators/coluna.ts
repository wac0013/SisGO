'use strict';

export function Coluna(info?: any) {
  return (target: Object, key: string) => {
    const valor = this[key];
  };
}
