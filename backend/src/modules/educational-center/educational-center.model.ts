import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../../config/database';

export class EducationalCenter extends Model<
  InferAttributes<EducationalCenter>,
  InferCreationAttributes<EducationalCenter>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare logoUrl: CreationOptional<string | null>;
  declare address: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
}

EducationalCenter.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    logoUrl: { type: DataTypes.STRING(500), allowNull: true },
    address: { type: DataTypes.STRING(255), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: 'educational_centers',
    timestamps: false,
  },
);