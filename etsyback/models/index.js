const Seq = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Seq(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  operatorsAliases: false,
});

const db = {};
db.seq = Seq;
db.sequelize = sequelize;
db.users = require('./user.model')(sequelize, Seq);

module.exports = db;
