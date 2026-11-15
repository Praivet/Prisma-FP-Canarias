import { EmploymentRecord } from "./employment-record.model.js";
import { Student } from "../student/student.model.js";
import { Company } from "../company/company.model.js";
import { Internship } from "../internship/internship.model.js";

const includeCompany = {
    model: Company,
    as: "company",
    attributes: ["id", "name"],
};

export class EmploymentRecordService {
    static async findAll() {
        return EmploymentRecord.findAll({
            include: [includeCompany],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return EmploymentRecord.findByPk(id, {
            include: [includeCompany],
        });
    }
    static async studentExists(studentId: number) {
        const student = await Student.findByPk(studentId);
        return student !== null;
    }
    static async companyExists(companyId: number) {
        const company = await Company.findByPk(companyId);
        return company !== null;
    }
    static async internshipExists(internshipId: number) {
        const internship = await Internship.findByPk(internshipId);
        return internship !== null;
    }
    static async create(data: {
        studentId: number;
        companyId: number;
        internshipId?: number | null;
        position: string;
        sector?: string | null;
        startDate: string;
        endDate?: string | null;
        isRelatedToStudies?: boolean;
    }) {
        const employmentRecord = await EmploymentRecord.create(data);
        return EmploymentRecordService.findById(employmentRecord.id);
    }
    static async update(
        employmentRecord: EmploymentRecord,
        data: {
            studentId?: number;
            companyId?: number;
            internshipId?: number | null;
            position?: string;
            sector?: string | null;
            startDate?: string;
            endDate?: string | null;
            isRelatedToStudies?: boolean;
        }
    ) {
        await employmentRecord.update(data);
        return EmploymentRecordService.findById(employmentRecord.id);
    }
    static async delete(employmentRecord: EmploymentRecord) {
        await employmentRecord.destroy();
    }
}
