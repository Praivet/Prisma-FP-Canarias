import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export type SkillLevel = "basic" | "intermediate" | "advanced";

export class StudentSkill extends Model<
  InferAttributes<StudentSkill>,
  InferCreationAttributes<StudentSkill>
> {
  declare id: CreationOptional<number>;
  declare studentId: number;
  declare skillId: number;
  declare level: CreationOptional<SkillLevel>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

StudentSkill.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    // Join table of the N:M Student <-> Skill: it holds both FKs (studentId and skillId).
    // Create the student and the skill first, then the student skill (FK order).
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    skillId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM("basic", "intermediate", "advanced"),
      allowNull: false,
      defaultValue: "basic",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "student_skills",
    modelName: "StudentSkill",
    timestamps: true,
    // The same skill cannot be added twice to the same student.
    indexes: [{ unique: true, fields: ["studentId", "skillId"] }],
  }
);
