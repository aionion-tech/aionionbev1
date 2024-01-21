import { envConfig } from "../config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(envConfig.DB.uri, {
  logging: false,
});

export default sequelize;
