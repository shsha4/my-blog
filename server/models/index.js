'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
    ];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

    db.Teacher = require('./teacher')(sequelize, Sequelize);
    db.Class = require('./class')(sequelize, Sequelize);

    //1 : 1 관계
    // db.Teacher.hasOne(db.Class);
    //
    //1 : M 관계
    // db.Teacher.hasMany(db.Class, {
    //     foreignKey: 'teacher_id',
    //     sourceKey: 'id'
    // });
    // db.Class.belongsTo(db.Teacher, {
    //    foreignKey: 'teacher_id',
    //    targetKey: 'id'
    // });

    //N : M 관계
    db.Teacher.belongsToMany(db.Class, {
        through: 'schedule',
        foreignKey:'teacher_id'
    });
    db.Class.belongsToMany(db.Teacher, {
       through: 'schedule',
       foreignKey: 'class_id'
    });;

db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;

