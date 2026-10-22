import { Company } from "./company.model.js";

export class CompanyService {
    static async findAll() {
        return Company.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Company.findByPk(id);
    }
    static async taxIdExists(taxId: string) {
        const company = await Company.findOne({ where: { taxId } });
        return company !== null;
    }
    static async create(data: {
        taxId: string;
        name: string;
        sector?: string | null;
        city?: string | null;
        contactEmail?: string | null;
        contactPhone?: string | null;
    }) {
        const company = await Company.create(data);
        return CompanyService.findById(company.id);
    }
    static async update(
        company: Company,
        data: {
            taxId?: string;
            name?: string;
            sector?: string | null;
            city?: string | null;
            contactEmail?: string | null;
            contactPhone?: string | null;
        }
    ) {
        await company.update(data);
        return CompanyService.findById(company.id);
    }
    static async delete(company: Company) {
        await company.destroy();
    }
}
