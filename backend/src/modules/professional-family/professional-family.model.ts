import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../../config/database';

export class ProfessionalFamily extends Model<
  InferAttributes<ProfessionalFamily>,
  InferCreationAttributes<ProfessionalFamily>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare description: CreationOptional<string | null>;
}

ProfessionalFamily.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'professional_families',
    timestamps: false,
  },
);