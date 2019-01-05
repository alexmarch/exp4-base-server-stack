const Sequelize = require('sequelize');
const path = require('path');

let options = {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

if (process.env.NODE_ENV !== 'production') {
    options.dialect = 'sqlite';
    if (process.env.NODE_ENV === 'test') {
        options.storage = path.resolve(__dirname, '../test.sqlite');
    } else {
        options.storage = path.resolve(__dirname, '../app.sqlite');
    }
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    options
);

module.exports = sequelize;