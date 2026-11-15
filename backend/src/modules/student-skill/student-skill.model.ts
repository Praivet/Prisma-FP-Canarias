import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class StudentSkill extends Model<
  InferAttributes<StudentSkill>,
  InferCreationAttributes<StudentSkill>
> {
  declare studentId: number;
  declare skillId: number;
  declare proficiencyLevel: CreationOptional<string | null>;
  declare updatedAt: CreationOptional<Date>;
}

StudentSkill.init(
  {
    // Join table of the N:M Student <-> Skill: it holds both FKs (studentId and skillId).
    // There is no own id: the PK is composite (studentId + skillId), as in the ERD,
    // so the same skill cannot be added twice to the same student.
    // Create the student and the skill first, then the student skill (FK order).
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    skillId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    proficiencyLevel: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "student_skills",
    modelName: "StudentSkill",
    // The ERD only has updatedAt for this table.
    timestamps: true,
    createdAt: false,
  }
);
