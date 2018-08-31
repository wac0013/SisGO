'use strict';

export class ErroBanco extends Error {
  constructor(mensagem: string, erro?: Error) {
    super(mensagem);
    this.stack = erro ? erro.stack : '';
    this.name = 'ErroBanco';
    this.message = mensagem;
  }
}
