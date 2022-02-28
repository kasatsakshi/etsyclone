const dbConfig = require('../config/db.config.js');
const seq = require('sequelize');
const sequelize = new seq(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql',
    operatorsAliases: false,
});

const db = {};
db.seq = seq;
db.sequelize = sequelize;
db.users = require('./user.model.js')(sequelize, seq);
module.exports = db;