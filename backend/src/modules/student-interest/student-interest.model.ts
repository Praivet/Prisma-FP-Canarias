import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// 'Many' side of 1:N Student -> StudentInterest. It holds the FK (studentId).
export class StudentInterest extends Model<
  InferAttributes<StudentInterest>,
  InferCreationAttributes<StudentInterest>
> {
  declare id: CreationOptional<number>;
  declare studentId: number;
  declare name: string;
  declare description: CreationOptional<string | null>;
}

StudentInterest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // FK of 1:N Student -> StudentInterest. Same name as in associations.ts.
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,

    tableName: "student_interests",

    modelName: "StudentInterest",

    // The ERD has no createdAt/updatedAt for this table.
    timestamps: false,
  }
);
