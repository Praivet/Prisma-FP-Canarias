import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// Not a join table: an entity with three FKs, each one the 'many' side of a 1:N
// from User (tutorId), TrainingProgram (programId) and AcademicYear (academicYearId).
export class TutorAssignment extends Model<
  InferAttributes<TutorAssignment>,
  InferCreationAttributes<TutorAssignment>
> {
  declare id: CreationOptional<number>;
  declare tutorId: number;
  declare programId: number;
  declare academicYearId: number;
  declare assignedAt: CreationOptional<Date>;
}

TutorAssignment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // FK of 1:N User -> TutorAssignment (the tutor is a user). Same name as in associations.ts.
    tutorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    // FK of 1:N TrainingProgram -> TutorAssignment. Same name as in associations.ts.
    programId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    // FK of 1:N AcademicYear -> TutorAssignment. Same name as in associations.ts.
    academicYearId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,

    tableName: "tutor_assignments",

    modelName: "TutorAssignment",

    // The ERD has no createdAt/updatedAt for this table (assignedAt is its own date).
    timestamps: false,
  }
);
