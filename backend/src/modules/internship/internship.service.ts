import { Internship } from "./internship.model.js";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model.js";
import { Company } from "../company/company.model.js";

const includeCompany = {
    model: Company,
    as: "company",
    attributes: ["id", "name"],
};

export class InternshipService {
    static async findAll() {
        return Internship.findAll({
            include: [includeCompany],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Internship.findByPk(id, {
            include: [includeCompany],
        });
    }
    static async studentEnrollmentExists(studentEnrollmentId: number) {
        const studentEnrollment = await StudentEnrollment.findByPk(studentEnrollmentId);
        return studentEnrollment !== null;
    }
    static async companyExists(companyId: number) {
        const company = await Company.findByPk(companyId);
        return company !== null;
    }
    static async create(data: {
        enrollmentId: number;
        companyId: number;
        startDate: string;
        endDate?: string | null;
        wasHired?: boolean;
        hiringDate?: string | null;
    }) {
        const internship = await Internship.create(data);
        return InternshipService.findById(internship.id);
    }
    static async update(
        internship: Internship,
        data: {
            enrollmentId?: number;
            companyId?: number;
            startDate?: string;
            endDate?: string | null;
            wasHired?: boolean;
            hiringDate?: string | null;
        }
    ) {
        await internship.update(data);
        return InternshipService.findById(internship.id);
    }
    static async delete(internship: Internship) {
        await internship.destroy();
    }
}
