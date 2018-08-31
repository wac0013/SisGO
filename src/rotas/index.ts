'use strict';

import { Request, Response, Application } from 'express';

export class Rotas {
  public rotas(app: Application): void {
    app.route('/login').get((req: Request, res: Response) => {
      res.json({ teste: 'teste' });
    });
  }
}
