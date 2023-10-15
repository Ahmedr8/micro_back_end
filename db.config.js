
const Sequelize = require("sequelize");
const dbConfig = {
    HOST: "dpg-ckjfc1c8fhmc7395chvg-a.oregon-postgres.render.com",
    USER: "welhazi",
    PASSWORD: "fxVZleRFcGyHfBLqfb5vzKRxBKcWduq4",
    DB: "profjecteur",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 5000
    }
  };


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    ssl: true
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;