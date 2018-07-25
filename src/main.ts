import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as fs from "fs";
import * as spdy from "spdy";
// import errorHandler = require("errorhandler");
// import methodOverride = require("method-override");

export class Servidor {
  private _app: express.Application;
  private _http2: spdy.Server;
  private _config: Object;

  public static IniciarServidor() {
    new Servidor();
  }6

  constructor() {
    this._config = {
      key: fs.readFileSync(__dirname + "/certificado/server.key"),
      cert: fs.readFileSync(__dirname + "/certificado/server.crt")
    };
    this._app = express();
    this._http2 = spdy();
  }
}
