import { DataTypes, Sequelize } from "sequelize";
import path from 'path';
import dbConfig from '../config/db.js';

const basename = path.basename(__filename);
const models = {};
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig,
);

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
