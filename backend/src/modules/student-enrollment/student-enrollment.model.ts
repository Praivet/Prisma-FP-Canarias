import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// 'Many' side of three 1:N: Student, TrainingProgram and AcademicYear -> StudentEnrollment.
// It holds the three FKs (studentId, programId, academicYearId).
export class StudentEnrollment extends Model<
  InferAttributes<StudentEnrollment>,
  InferCreationAttributes<StudentEnrollment>
> {
  declare id: CreationOptional<number>;
  declare studentId: number;
  declare programId: number;
  declare academicYearId: number;
  declare enrollmentDate: CreationOptional<Date>;
  declare graduationDate: CreationOptional<Date | null>;
  declare status: CreationOptional<string>;
}

StudentEnrollment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // FK of 1:N Student -> StudentEnrollment. Same name as in associations.ts.
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    // FK of 1:N TrainingProgram -> StudentEnrollment. The ERD calls it programId.
    programId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    // FK of 1:N AcademicYear -> StudentEnrollment. Same name as in associations.ts.
    academicYearId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    enrollmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    // Null until the student finishes the program.
    graduationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "enrolled",
    },
  },
  {
    sequelize,

    tableName: "student_enrollments",

    modelName: "StudentEnrollment",

    // The ERD has no createdAt/updatedAt for this table.
    timestamps: false,
  }
);
