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
  public app: express.Application;

  public static IniciarServidor(): Servidor {
    return new Servidor();
  }

  constructor() {
    this.app = express();
  }
}