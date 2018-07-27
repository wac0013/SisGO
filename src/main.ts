import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as fs from "fs";
import * as spdy from "spdy";
import * as webpack from "webpack";
import * as helmet from "helmet";
import rotas from "./routes";

export class Servidor {
  private _app: express.Application;
  private _http2: spdy.Server;
  private _config: Object;

  public static IniciarServidor() {
    const porta = process.env.PORT || 3000;
    const app = new Servidor();

    app._http2.listen(porta, function(erro: Error) {
      if (erro) {
        console.error(
          "Ocorreu um erro ao iniciar o servidor na porta " + 3000 + "\n" + erro
        );
        process.exit(1);
      } else {
        console.info("Servidor executando na porta " + 3000 + "!");
      }
    });
  }

  private constructor() {
    const compiler  = webpack(require("../webpack.config.js"));
    const session   = require("cookie-session");
    this._config = {
      key: fs.readFileSync(__dirname + "/certificado/server.key"),
      cert: fs.readFileSync(__dirname + "/certificado/server.crt")
    };

    this._app = express();
    this._app.use(express.static(path.join(__dirname, "../dist/public")));
    this._app.use(
      webpackDevMiddleware(compiler, {
        publicPath: path.join(__dirname, ""),
        stats: { colors: true }
      })
    );
    this._app.use(
      webpackHotMiddleware(compiler, {
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000
      })
    );
    this._app.set("views", path.join(__dirname, "../dist/public/views"));
    this._app.set("view engine", "html");
    this._app.use(helmet());
    this._app.use(compression());
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(require("method-override")());
    this._app.use(
      session({
        name: "sessaoID",
        keys: ["chave1"],
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas para expirar
      })
    );
    this._app.use(rotas);
    this._app.use(require("errorhandler")());
    this._http2 = spdy.createServer(this._config, this._app);
  }
}
