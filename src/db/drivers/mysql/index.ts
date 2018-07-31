import * as mysql from 'mysql';
import { DriverAbstrato } from '../abstract';

class MySQL extends DriverAbstrato {
  private _driver: mysql.Pool;
  private con: mysql.Connection;

  constructor() {
    super();
    this._driver = mysql.createPool({
      database: 'host',
      host: '',
      port: '',
      user: '',
      password: '',
      acquireTimeout: '',
      connectTimeout: '',s
      connectionLimit: '',
      timezone: '',
      charset: ''
    });

    this._driver;
    this.con.
  }

}
