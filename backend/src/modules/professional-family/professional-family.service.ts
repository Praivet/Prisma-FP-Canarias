import { ProfessionalFamily } from "./professional-family.model.js";
export class ProfessionalFamilyService {
    static async findAll() {
        return ProfessionalFamily.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return ProfessionalFamily.findByPk(id);
    }
    static async create(data: {
        name: string;
        code: string;
        description?: string | null;
    }) {
        return ProfessionalFamily.create(data);
    }
    static async update(
        professionalFamily: ProfessionalFamily,
        data: {
            name?: string;
            code?: string;
            description?: string | null;
        }
    ) {
        return professionalFamily.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(professionalFamily: ProfessionalFamily) {
        await professionalFamily.destroy();
    }
}