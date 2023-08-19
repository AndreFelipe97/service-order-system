import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { Assessment, Order, User } from './models';
require('dotenv').config();

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const PORT = process.env.PORT_HOST;

const start = async () => {
  const app = express();

  const admin = new AdminJS({
    resources: [User, Order, Assessment],
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://${process.env.HOST}:${PORT}${admin.options.rootPath}`,
    );
  });
};

start();
