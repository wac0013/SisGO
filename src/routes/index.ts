import { Request, Response, Application } from 'express';

export class Rotas {
  public rotas(app: Application): void {
    app.route('/').get((req: Request, res: Response) => {
      //
    });
  }
}
