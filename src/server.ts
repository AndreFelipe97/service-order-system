import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
require('dotenv').config();

const PORT = process.env.PORT_HOST;

const start = async () => {
  const app = express();

  const admin = new AdminJS({});

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://${process.env.HOST}:${PORT}${admin.options.rootPath}`,
    );
  });
};

start();
