export enum Drivers {
  MYSQL: 'mysql2' = 3306,
  ORACLE: 'oracledb' = 1521
}

export interface IPool {
  max: number;
  min: number;
  timeout_exec: number;
  timeout_nova: number;
}
