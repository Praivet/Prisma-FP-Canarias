import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// 'One' side of 1:N Student -> StudentEnrollment and Student -> StudentInterest,
// and one side of the N:M Student <-> Skill (through StudentSkill).
export class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare nationalId: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: CreationOptional<string | null>;
  declare birthDate: CreationOptional<Date | null>;
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

    // DNI / NIE
    nationalId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { isEmail: true },
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    birthDate: {
      type: DataTypes.DATEONLY,
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
