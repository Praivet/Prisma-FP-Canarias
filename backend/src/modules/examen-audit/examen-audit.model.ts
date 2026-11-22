import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class ExamenAudit extends Model<
    InferAttributes<ExamenAudit>,
    InferCreationAttributes<ExamenAudit>
> {
    declare id: CreationOptional<number>;
    // FK obligatoria: cada ExamenAudit pertenece a una Company (N:1 en el ERD)
    declare companyId: number;
    declare description: string;
    // Puede ser null; si tiene valor solo puede ser CREATE, MODIFY o READ
    declare operation: CreationOptional<"CREATE" | "MODIFY" | "READ" | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ExamenAudit.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        companyId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        operation: {
            type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "examen_audit",
        modelName: "ExamenAudit",
        timestamps: true,
    }
);
