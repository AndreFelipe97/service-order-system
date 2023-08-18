import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface IOrder {
  id: number;
  title: string;
  description: string;
  status: boolean;
  serviceProvider: number;
  client: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderCreationAttributes = Optional<IOrder, 'id'>;

export class Order extends Model<IOrder, OrderCreationAttributes> {
  declare id: number | null;
  declare title: string | null;
  declare description: string | null;
  declare status: boolean | null;
  declare serviceProvider: number | null;
  declare client: number | null;
  declare createdAt: Date | null;
  declare updatedAt: Date | null;
}

Order.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    status: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
    },
    serviceProvider: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    tableName: 'orders',
    modelName: 'order',
  },
);
