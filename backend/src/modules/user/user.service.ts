import { User } from "./user.model.js";
export class UserService {
    static async findAll() {
        return User.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return User.findByPk(id);
    }
    static async create(data: {
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        isActive?: boolean;
        failedLoginAttempts?: number;
        lockedUntil?: Date | null;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return User.create(data);
    }
    static async update(
        user: User,
        data: {
            email?: string;
            passwordHash?: string;
            firstName?: string;
            lastName?: string;
            isActive?: boolean;
            failedLoginAttempts?: number;
            lockedUntil?: Date | null;
        }
    ) {
        return user.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(user: User) {
        await user.destroy();
    }
}