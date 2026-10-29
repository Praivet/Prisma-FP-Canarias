import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class EmploymentRecord extends Model<
    InferAttributes<EmploymentRecord>,
    InferCreationAttributes<EmploymentRecord>
> {
    declare id: CreationOptional<number>;
    declare studentId: number;
    declare companyId: number;
    // FK opcional: puede ser null (relación 0..1 a N en el ERD)
    declare internshipId: CreationOptional<number | null>;
    declare position: string;
    declare sector: CreationOptional<string | null>;
    // DATEONLY guarda solo la fecha (sin hora) y Sequelize la devuelve como
    // texto "YYYY-MM-DD", por eso en TypeScript es string y no Date.
    declare startDate: string;
    declare endDate: CreationOptional<string | null>;
    declare isRelatedToStudies: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

EmploymentRecord.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        studentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        internshipId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        sector: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        isRelatedToStudies: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "employment_records",
        modelName: "EmploymentRecord",
        timestamps: true,
    }
);
