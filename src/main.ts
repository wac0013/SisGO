'use strict';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as logger from 'morgan';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as helmet from 'helmet';
import * as history from 'connect-history-api-fallback';
import { Rotas } from './rotas';
import { Server, createServer } from 'https';
import * as versao from './modelos/versao';

export class Servidor {
  private _app: express.Application;
  private _http2: Server;
  private _config: Object;
  private _rotas: Rotas;

  public static IniciarServidor() {
    const porta = process.env.PORT || 3000;
    const app = new Servidor();

    app._http2.listen(porta, function(erro: Error) {
      if (erro) {
        console.error('Ocorreu um erro ao iniciar o servidor na porta ' + porta + '\n' + erro);
        process.exit(1);
      } else {
        console.info('Servidor executando na porta ' + porta + '!');
      }
    });
  }

  private constructor() {
    this._app = express();
    this._rotas = new Rotas();
    const session = require('cookie-session');

    this._config = {
      key: readFileSync(join(__dirname, '../certificado/server.key')),
      cert: readFileSync(join(__dirname, '../certificado/server.crt'))
    };

    this._app.set('views', join(__dirname, '../dist/public'));
    this._app.set('view engine', 'html');

    this._app.use(express.static(join(__dirname, '../dist/public')));

    if (process.env.NODE_ENV === 'development' || 'dev') {
      this._app.use(logger('dev'));
    } else {
      this._app.use(logger('combined'));
    }

    this._app.use(helmet());
    this._app.use(compression());
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(require('method-override')());
    this._app.use(
      session({
        name: 'sessaoID',
        keys: ['chave1'],
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas para expirar
      })
    );
    // configurando rotas
    this._rotas.rotas(this._app);
    this._app.use(history);
    this._app.use(require('errorhandler')());
    this._http2 = createServer(this._config, this._app);

    try {
      console.log(`iniciando`)
      versao.Versao.teste()
    } catch (error) {

    }
  }
}

Servidor.IniciarServidor();
