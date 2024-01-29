require('dotenv').config();

const { env } = process;

const dbConfig = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'crm',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: true,
    seederStorage: 'sequelize',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME ,
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
    seederStorage: 'sequelize',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    operatorsAliases: 0,
    logging: false,
  },
};

module.exports = dbConfig[env.NODE_ENV];