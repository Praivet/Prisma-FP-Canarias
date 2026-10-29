import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// 'Many' side of 1:N ProfessionalFamily -> TrainingProgram and EducationalCenter -> TrainingProgram.
// 'One' side of 1:N TrainingProgram -> StudentEnrollment and TrainingProgram -> TutorAssignment.
export class TrainingProgram extends Model<
  InferAttributes<TrainingProgram>,
  InferCreationAttributes<TrainingProgram>
> {
  declare id: CreationOptional<number>;
  declare familyId: number;
  declare centerId: number;
  declare name: string;
  declare code: string;
  declare level: string;
  declare isActive: CreationOptional<boolean>;
}

TrainingProgram.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // FK of 1:N ProfessionalFamily -> TrainingProgram. Same name as in associations.ts.
    familyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    // FK of 1:N EducationalCenter -> TrainingProgram. Same name as in associations.ts.
    centerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    // Example: "Grado Medio", "Grado Superior"
    level: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,

    tableName: "training_programs",

    modelName: "TrainingProgram",

    // The ERD has no createdAt/updatedAt for this table.
    timestamps: false,
  }
);
