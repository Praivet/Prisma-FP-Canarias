import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

// 'Many' side of 1:N Student -> StudentInterest. It holds the FK (studentId).
export class StudentInterest extends Model<
  InferAttributes<StudentInterest>,
  InferCreationAttributes<StudentInterest>
> {
  declare id: CreationOptional<number>;
  declare studentId: number;
  declare name: string;
  declare description: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdAt: DataTypes.DATE,

    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,

    tableName: "student_interests",

    modelName: "StudentInterest",

    timestamps: true,
  }
);
