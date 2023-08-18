import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env}`,
  {
    dialect: 'mysql',
  },
);

export { sequelize };
