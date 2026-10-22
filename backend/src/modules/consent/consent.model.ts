import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class Consent extends Model<
    InferAttributes<Consent>,
    InferCreationAttributes<Consent>
> {
    declare id: CreationOptional<number>;
    declare studentId: number;
    // FK opcional: puede ser null (relación 0..1 a N en el ERD)
    declare consentRequestId: CreationOptional<number | null>;
    declare purpose: string;
    declare status: "granted" | "denied" | "revoked";
    declare policyVersion: string;
    declare recordedAt: CreationOptional<Date>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Consent.init(
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
        consentRequestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        purpose: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("granted", "denied", "revoked"),
            allowNull: false,
        },
        policyVersion: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        recordedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "consents",
        modelName: "Consent",
        timestamps: true,
    }
);
