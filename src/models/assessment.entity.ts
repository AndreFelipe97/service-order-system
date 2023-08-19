import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface IAssessment {
  id: number;
  orderId: string;
  serviceProvider: number;
  client: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AssessmentCreationAttributes = Optional<IAssessment, 'id'>;

export class Assessment extends Model<
  IAssessment,
  AssessmentCreationAttributes
> {
  declare id: number | null;
  declare orderId: number | null;
  declare serviceProvider: number | null;
  declare client: number | null;
  declare description: string | null;
  declare createdAt: Date | null;
  declare updatedAt: Date | null;
}

Assessment.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    serviceProvider: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    client: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    description: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    tableName: 'assessments',
    modelName: 'assessment',
  },
);
