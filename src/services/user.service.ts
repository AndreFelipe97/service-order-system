import { hash } from 'bcryptjs';
import { sequelize } from '../db';

export async function CreateUser(request: any) {
  const password = request.payload.password;

  if (password) {
    request.payload = {
      ...request.payload,
      password: await hash(password, 8),
    };
  }

  console.log(
    await sequelize.query('SELECT * FROM users WHERE serviceProvider=0'),
  );

  return request;
}
