import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class ConsentRequest extends Model<
    InferAttributes<ConsentRequest>,
    InferCreationAttributes<ConsentRequest>
> {
    declare id: CreationOptional<number>;
    declare studentId: number;
    declare sentById: number;
    declare tokenHash: string;
    declare sentAt: CreationOptional<Date>;
    declare expiresAt: Date;
    declare usedAt: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ConsentRequest.init(
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
        sentById: {
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
        usedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "consent_requests",
        modelName: "ConsentRequest",
        timestamps: true,
    }
);
