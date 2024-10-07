import { Sequelize } from 'sequelize';
import {config} from "dotenv"
config()

export  const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql2",
});
