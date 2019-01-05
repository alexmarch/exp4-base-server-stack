const db = require('../db');
const bcrypt = require('bcrypt');

const User = db.define('user',{
    username: {
        type: db.Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

User.beforeCreate(function(user, options){
    return bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
    });
});

module.exports = User;