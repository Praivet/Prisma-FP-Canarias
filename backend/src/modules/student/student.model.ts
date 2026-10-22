import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

// 'One' side of 1:N Student -> StudentEnrollment and Student -> StudentInterest,
// and one side of the N:M Student <-> Skill (through StudentSkill).
export class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare birthDate: CreationOptional<Date | null>;
  declare phone: CreationOptional<string | null>;
  declare city: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // FK of 1:1 User -> Student (one student per user). Same name as in associations.ts.
    // unique: true is what makes it 1:1 in the database.
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },

    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    createdAt: DataTypes.DATE,

    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,

    tableName: "students",

    modelName: "Student",

    timestamps: true,
  }
);
