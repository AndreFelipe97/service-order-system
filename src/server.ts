import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { Assessment, Order, User } from './models';
import { generateResource } from './utils/generateResource';
import { CreateUser } from './services/user.service';
import { sequelize } from './db';
require('dotenv').config();

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const PORT = process.env.PORT_HOST;

interface IUser {
  id: number;
  name: string;
}

const start = async () => {
  const app = express();

  const admin = new AdminJS({
    resources: [
      generateResource(
        User,
        {
          password: {
            type: 'password',
            isVisible: {
              create: true,
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        {
          new: {
            before: async (request: any) => {
              return CreateUser(request);
            },
          },
          edit: {
            before: async (request: any) => {
              return CreateUser(request);
            },
          },
        },
      ),
      generateResource(
        Order,
        {
          serviceProvider: {
            availableValues: async () => {
              const servicesProviders = await sequelize.query(
                'SELECT * FROM users WHERE serviceProvider=1',
              );

              console.log(servicesProviders);

              const newListServicesProviders = servicesProviders.map(
                (serviceProvider: any) => ({
                  value: serviceProvider.id,
                  label: serviceProvider.name,
                }),
              );

              return newListServicesProviders;
            },
          },
        },
        {},
      ),
      generateResource(Assessment, {}, {}),
    ],
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
