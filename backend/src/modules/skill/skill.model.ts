import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// One side of the N:M Student <-> Skill. The FKs live in the join table (StudentSkill).
export class Skill extends Model<
  InferAttributes<Skill>,
  InferCreationAttributes<Skill>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare category: CreationOptional<string | null>;
  declare description: CreationOptional<string | null>;
}

Skill.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,

    tableName: "skills",

    modelName: "Skill",

    // The ERD has no createdAt/updatedAt for this table.
    timestamps: false,
  }
);
