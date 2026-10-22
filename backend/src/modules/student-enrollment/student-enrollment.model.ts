import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

export type EnrollmentStatus = "enrolled" | "completed" | "dropped";

// 'Many' side of three 1:N: Student, TrainingProgram and AcademicYear -> StudentEnrollment.
// It holds the three FKs (studentId, trainingProgramId, academicYearId).
export class StudentEnrollment extends Model<
  InferAttributes<StudentEnrollment>,
  InferCreationAttributes<StudentEnrollment>
> {
  declare id: CreationOptional<number>;
  declare studentId: number;
  declare trainingProgramId: number;
  declare academicYearId: number;
  declare enrollmentDate: CreationOptional<Date>;
  declare status: CreationOptional<EnrollmentStatus>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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

    // FK of 1:N TrainingProgram -> StudentEnrollment. Same name as in associations.ts.
    trainingProgramId: {
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

    status: {
      type: DataTypes.ENUM("enrolled", "completed", "dropped"),
      allowNull: false,
      defaultValue: "enrolled",
    },

    createdAt: DataTypes.DATE,

    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,

    tableName: "student_enrollments",

    modelName: "StudentEnrollment",

    timestamps: true,
  }
);
