import {Table, Column, Model} from 'sequelize-typescript';

class Usuario extends Model<Usuario> {
  @Column
  private login: string;

}
