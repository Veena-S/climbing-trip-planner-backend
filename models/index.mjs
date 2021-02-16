import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initRouteModel from './route.mjs';
import initTripModel from './trip.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Route = initRouteModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);

db.Route.belongsTo(db.Trip);
db.Trip.hasMany(db.Route);

export default db;
