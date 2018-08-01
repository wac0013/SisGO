import { Tabela } from '../db/Tabela';

export enum Processos {
  Iniciar = 'Iniciar',
  Finalizar = 'Finalizar',
  Lancar_Erro = 'Erro',
  Reiniciar = 'Reiniciar',
}

export class LogsServidor extends Tabela {
  private _data_hora: Date;
  private _processo: Processos;
  private _mensagem_adicional: string;

  constructor(processo: Processos, mensagem?: string) {
    this._processo = processo;
    this._mensagem_adicional = mensagem ? mensagem : '';
  }
}
