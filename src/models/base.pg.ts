import config from '@config';
import { Sequelize } from 'sequelize';
import * as entities from '@models/entities';

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = config.DATABASE;

const entitiesArray = [];
for (const elementEntity of Object.values(entities)) {
  entitiesArray.push({
    provide: elementEntity,
    useValue: elementEntity,
  });
}
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  // define: {
  //   charset: 'utf8mb4',
  //   collate: 'utf8mb4_general_ci',
  //   underscored: true,
  //   freezeTableName: true,
  // },
  pool: {
    max: 20,
    min: 0,
    idle: 200000,
    acquire: 100000,
  },
  timezone: '+07:00',
  // dialectOptions: {
  // ssl: {
  //   require: false,
  //   rejectUnauthorized: false,
  // },
  // },
  // logQueryParameters: config.NODE_ENV === 'development',
  // logging: (query, time) => {
  //   logger.info(time + 'ms' + ' ' + query);
  // },
  logging: false,
  benchmark: true,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
export { sequelize, Sequelize };
