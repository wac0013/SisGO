import * as ora from 'oracledb';

const pool: ora.IConnectionPool = ora.createPool(poolAttributes, callback);
