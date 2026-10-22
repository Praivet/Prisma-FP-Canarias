import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class SurveyInvitation extends Model<
    InferAttributes<SurveyInvitation>,
    InferCreationAttributes<SurveyInvitation>
> {
    declare id: CreationOptional<number>;
    declare surveyId: number;
    declare studentId: number;
    declare tokenHash: string;
    declare sentAt: CreationOptional<Date>;
    declare expiresAt: Date;
    declare completedAt: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

SurveyInvitation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        surveyId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        tokenHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        sentAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "survey_invitations",
        modelName: "SurveyInvitation",
        timestamps: true,
    }
);
