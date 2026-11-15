import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class Company extends Model<
    InferAttributes<Company>,
    InferCreationAttributes<Company>
> {
    declare id: CreationOptional<number>;
    declare taxId: string;
    declare name: string;
    declare sector: CreationOptional<string | null>;
    declare city: CreationOptional<string | null>;
    declare contactEmail: CreationOptional<string | null>;
    declare contactPhone: CreationOptional<string | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        taxId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        sector: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        contactEmail: {
            type: DataTypes.STRING(160),
            allowNull: true,
        },
        contactPhone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "companies",
        modelName: "Company",
        timestamps: true,
    }
);
