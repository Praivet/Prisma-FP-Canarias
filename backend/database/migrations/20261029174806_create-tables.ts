import { QueryInterface, DataTypes } from 'sequelize';

/**
 * Migration: 20261029174806_create-tables
 * Generated on: 2026-10-29T17:48:06.531Z
 */

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('companies', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    tax_id: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    sector: { type: DataTypes.STRING(100), allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    contact_email: { type: DataTypes.STRING(160), allowNull: true },
    contact_phone: { type: DataTypes.STRING(20), allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('internships', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    enrollment_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"student_enrollments","key":"id"} },
    company_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"companies","key":"id"} },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: true },
    was_hired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    hiring_date: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('employment_records', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"students","key":"id"} },
    company_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"companies","key":"id"} },
    internship_id: { type: DataTypes.INTEGER, allowNull: true, references: {"model":"internships","key":"id"} },
    position: { type: DataTypes.STRING(150), allowNull: false },
    sector: { type: DataTypes.STRING(100), allowNull: true },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: true },
    is_related_to_studies: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('consent_requests', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"students","key":"id"} },
    sent_by_id: { type: DataTypes.INTEGER, allowNull: false },
    token_hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    sent_at: { type: DataTypes.DATE, allowNull: false, defaultValue: null },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    used_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('consents', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"students","key":"id"} },
    consent_request_id: { type: DataTypes.INTEGER, allowNull: true, references: {"model":"consent_requests","key":"id"} },
    purpose: { type: DataTypes.STRING(100), allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    policy_version: { type: DataTypes.STRING(20), allowNull: false },
    recorded_at: { type: DataTypes.DATE, allowNull: false, defaultValue: null },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('surveys', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('survey_questions', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    survey_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"surveys","key":"id"} },
    question_text: { type: DataTypes.STRING(500), allowNull: false },
    question_type: { type: DataTypes.STRING, allowNull: false },
    sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    is_required: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('survey_invitations', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    survey_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"surveys","key":"id"} },
    student_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"students","key":"id"} },
    token_hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    sent_at: { type: DataTypes.DATE, allowNull: false, defaultValue: null },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    completed_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('survey_answers', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    invitation_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"survey_invitations","key":"id"} },
    question_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"survey_questions","key":"id"} },
    answer_value: { type: DataTypes.TEXT, allowNull: false },
    answered_at: { type: DataTypes.DATE, allowNull: false, defaultValue: null },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('academic_years', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  });

  await queryInterface.createTable('skills', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    category: { type: DataTypes.STRING(100), allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  await queryInterface.createTable('students', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    national_id: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    birth_date: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('student_enrollments', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"students","key":"id"} },
    program_id: { type: DataTypes.INTEGER, allowNull: false },
    academic_year_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"academic_years","key":"id"} },
    enrollment_date: { type: DataTypes.DATE, allowNull: false, defaultValue: null },
    graduation_date: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'enrolled' }
  });

  await queryInterface.createTable('student_interests', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false, references: {"model":"students","key":"id"} },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  await queryInterface.createTable('student_skills', {
    student_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, unique: true, references: {"model":"students","key":"id"} },
    skill_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, unique: true, references: {"model":"skills","key":"id"} },
    proficiency_level: { type: DataTypes.STRING(30), allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('users', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(100), allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    failed_login_attempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    locked_until: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true }
  });

  await queryInterface.createTable('roles', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  await queryInterface.createTable('permissions', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  await queryInterface.createTable('user_roles', {
    user_id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, unique: true, references: {"model":"users","key":"id"} },
    role_id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, unique: true, references: {"model":"roles","key":"id"} },
    assigned_at: { type: DataTypes.DATE, allowNull: false, defaultValue: null }
  });

  await queryInterface.createTable('role_permissions', {
    role_id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, unique: true, references: {"model":"roles","key":"id"} },
    permission_id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, unique: true, references: {"model":"permissions","key":"id"} }
  });

  await queryInterface.createTable('auth_tokens', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    token_hash: { type: DataTypes.STRING, allowNull: false, unique: true },
    token_type: { type: DataTypes.STRING(50), allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    used_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true, references: {"model":"users","key":"id"} }
  });

  await queryInterface.createTable('audit_logs', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    action: { type: DataTypes.STRING(100), allowNull: false },
    entity_type: { type: DataTypes.STRING(100), allowNull: false },
    entity_id: { type: DataTypes.STRING(100), allowNull: false },
    previous_values: { type: DataTypes.JSON, allowNull: true },
    new_values: { type: DataTypes.JSON, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true, references: {"model":"users","key":"id"} }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('audit_logs');

  await queryInterface.dropTable('auth_tokens');

  await queryInterface.dropTable('role_permissions');

  await queryInterface.dropTable('user_roles');

  await queryInterface.dropTable('permissions');

  await queryInterface.dropTable('roles');

  await queryInterface.dropTable('users');

  await queryInterface.dropTable('student_skills');

  await queryInterface.dropTable('student_interests');

  await queryInterface.dropTable('student_enrollments');

  await queryInterface.dropTable('students');

  await queryInterface.dropTable('skills');

  await queryInterface.dropTable('academic_years');

  await queryInterface.dropTable('survey_answers');

  await queryInterface.dropTable('survey_invitations');

  await queryInterface.dropTable('survey_questions');

  await queryInterface.dropTable('surveys');

  await queryInterface.dropTable('consents');

  await queryInterface.dropTable('consent_requests');

  await queryInterface.dropTable('employment_records');

  await queryInterface.dropTable('internships');

  await queryInterface.dropTable('companies');
}
