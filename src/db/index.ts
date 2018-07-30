import * as sequelize from 'sequelize';

export const bd: sequelize.Sequelize = new sequelize(
  process.env.BD || 'sisgo',
  process.env.BD_HOST || 'localhost',
  process.env.BD_SENHA || 'DADOS',
  {
    dialect: process.env.SGBD || 'mysql'
    host: process.env.BD_HOST || 'localhost',
    port: Number(process.env.BD_PORTA) || 3306,
    pool: {
      min: 1,
      max: 10,
      idle: 1000 * 60 * 2, // 2 min de timeout
      acquire: 1000 * 60, // 1 min para tentar criar uma nova conexão
    },
  }
);

