import { AuthToken } from "./auth-token.model.js";
export class AuthTokenService {
    static async findAll() {
        return AuthToken.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return AuthToken.findByPk(id);
    }
    static async create(data: {
        tokenHash: string;
        tokenType: string;
        expiresAt: Date;
        usedAt?: Date | null;
        createdAt?: Date;
    }) {
        return AuthToken.create(data);
    }
    static async update(
        authToken: AuthToken,
        data: {
            tokenHash?: string;
            tokenType?: string;
            expiresAt?: Date;
            usedAt?: Date | null;
        }
    ) {
        return authToken.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(authToken: AuthToken) {
        await authToken.destroy();
    }
}