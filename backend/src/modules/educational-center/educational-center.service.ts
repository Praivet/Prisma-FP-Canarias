import { EducationalCenter } from "./educational-center.model.js";
export class EducationalCenterService {
    static async findAll() {
        return EducationalCenter.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return EducationalCenter.findByPk(id);
    }
    static async create(data: {
        name: string;
        code: string;
        logoUrl?: string | null;
        address?: string | null;
        isActive?: boolean;
    }) {
        return EducationalCenter.create(data);
    }
    static async update(
        educationalCenter: EducationalCenter,
        data: {
            name?: string;
            code?: string;
            logoUrl?: string | null;
            address?: string | null;
            isActive?: boolean;
        }
    ) {
        return educationalCenter.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(educationalCenter: EducationalCenter) {
        await educationalCenter.destroy();
    }
}