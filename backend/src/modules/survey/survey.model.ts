import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class Survey extends Model<
    InferAttributes<Survey>,
    InferCreationAttributes<Survey>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: CreationOptional<string | null>;
    declare isActive: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Survey.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "surveys",
        modelName: "Survey",
        timestamps: true,
    }
);
