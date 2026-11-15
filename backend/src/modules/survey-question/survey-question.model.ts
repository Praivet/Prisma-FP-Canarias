import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class SurveyQuestion extends Model<
    InferAttributes<SurveyQuestion>,
    InferCreationAttributes<SurveyQuestion>
> {
    declare id: CreationOptional<number>;
    declare surveyId: number;
    declare questionText: string;
    declare questionType: "text" | "number" | "scale" | "boolean";
    declare sortOrder: CreationOptional<number>;
    declare isRequired: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

SurveyQuestion.init(
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
        questionText: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        questionType: {
            type: DataTypes.ENUM("text", "number", "scale", "boolean"),
            allowNull: false,
        },
        sortOrder: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
        isRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "survey_questions",
        modelName: "SurveyQuestion",
        timestamps: true,
    }
);
