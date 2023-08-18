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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
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
    description: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      unique: true,
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
    tableName: 'assessments',
    modelName: 'assessment',
  },
);
