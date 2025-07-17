import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
      logging: console.log,
    },
  }
);

console.log(`\n✅ MYSQL Connected !! DB HOST: ${process.env.HOST}`);

export default sequelize;
