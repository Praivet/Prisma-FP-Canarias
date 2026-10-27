import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class Internship extends Model<
    InferAttributes<Internship>,
    InferCreationAttributes<Internship>
> {
    declare id: CreationOptional<number>;
    declare enrollmentId: number;
    declare companyId: number;
    // DATEONLY guarda solo la fecha (sin hora) y Sequelize la devuelve como
    // texto "YYYY-MM-DD", por eso en TypeScript es string y no Date.
    declare startDate: string;
    declare endDate: CreationOptional<string | null>;
    declare wasHired: CreationOptional<boolean>;
    declare hiringDate: CreationOptional<string | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Internship.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        enrollmentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        wasHired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        hiringDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "internships",
        modelName: "Internship",
        timestamps: true,
    }
);
