import { Router } from "express";
import academicYearRoutes from "../modules/academic-year/academic-year.routes";
import skillRoutes from "../modules/skill/skill.routes";
import studentRoutes from "../modules/student/student.routes";
import studentEnrollmentRoutes from "../modules/student-enrollment/student-enrollment.routes";
import studentInterestRoutes from "../modules/student-interest/student-interest.routes";
import studentSkillRoutes from "../modules/student-skill/student-skill.routes";
import trainingProgramRoutes from "../modules/training-program/training-program.routes";
import tutorAssignmentRoutes from "../modules/tutor-assignament/tutor-assignament.routes";

const router = Router();

// Every new module must be mounted here (and its model imported in associations.ts).
router.use("/academic-years", academicYearRoutes);
router.use("/skills", skillRoutes);
router.use("/students", studentRoutes);
router.use("/student-enrollments", studentEnrollmentRoutes);
router.use("/student-interests", studentInterestRoutes);
router.use("/student-skills", studentSkillRoutes);
router.use("/training-programs", trainingProgramRoutes);
router.use("/tutor-assignments", tutorAssignmentRoutes);

export default router;
