const sequelize = require('./sequelize');
const mongo = require('./mongo')

module.exports = (type) => {
    this.authenticate = () => {
        if (type === 'mongo') {
          return new Promise((resolve, reject) => {
              mongo.on('error', err => reject(err));
              mongo.once('open', () => resolve(mongo));
          });
        }
        return sequelize.authenticate();
    };
    return this;
};