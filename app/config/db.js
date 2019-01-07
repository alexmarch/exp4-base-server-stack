module.exports = (type) => {
    this.authenticate = () => {
        if (type === 'mongo') {
            const mongo = require('./mongo');
            return new Promise((resolve, reject) => {
                mongo.on('error', err => reject(err));
                mongo.once('open', () => resolve(mongo));
            });
        } else {
            const sequelize = require('./sequelize');
            return sequelize.authenticate();
        }
    };
    return this;
};