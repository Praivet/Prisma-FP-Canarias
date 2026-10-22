import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

// 'One' side of 1:N AcademicYear -> StudentEnrollment. No FK here: the FK (academicYearId) is in StudentEnrollment.
export class AcademicYear extends Model<
  InferAttributes<AcademicYear>,
  InferCreationAttributes<AcademicYear>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare startDate: Date;
  declare endDate: Date;
  declare isActive: CreationOptional<boolean>;
}

AcademicYear.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // Example: "2025-2026"
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,

    tableName: "academic_years",

    modelName: "AcademicYear",

    // The ERD has no createdAt/updatedAt for this table.
    timestamps: false,
  }
);
