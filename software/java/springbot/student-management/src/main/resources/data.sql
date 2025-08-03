
-- Seeder for Student Management System

-- Insert Faculties
INSERT INTO m_faculties (id, name, description, code, created_at, update_at, delete_at, is_deleted) VALUES
('fac-001', 'Faculty of Engineering', 'Engineering and Technology programs', 'ENG', CURRENT_TIMESTAMP, NULL, NULL, false),
('fac-002', 'Faculty of Computer Science', 'Computer Science and Information Technology programs', 'CS', CURRENT_TIMESTAMP, NULL, NULL, false),
('fac-003', 'Faculty of Business', 'Business Administration and Management programs', 'BUS', CURRENT_TIMESTAMP, NULL, NULL, false),
('fac-004', 'Faculty of Science', 'Natural Sciences and Mathematics programs', 'SCI', CURRENT_TIMESTAMP, NULL, NULL, false),
('fac-005', 'Faculty of Arts', 'Liberal Arts and Humanities programs', 'ART', CURRENT_TIMESTAMP, NULL, NULL, false);

-- Insert Majors
INSERT INTO m_majors (id, name, description, code, faculity_id, created_at, update_at, delete_at, is_deleted) VALUES
('maj-001', 'Computer Engineering', 'Hardware and Software Engineering', 'CE', 'fac-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-002', 'Electrical Engineering', 'Electrical Systems and Electronics', 'EE', 'fac-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-003', 'Software Engineering', 'Software Development and Architecture', 'SE', 'fac-002', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-004', 'Information Systems', 'Business Information Systems', 'IS', 'fac-002', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-005', 'Business Administration', 'General Business Management', 'BA', 'fac-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-006', 'Marketing', 'Marketing and Sales Management', 'MKT', 'fac-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-007', 'Mathematics', 'Pure and Applied Mathematics', 'MATH', 'fac-004', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-008', 'Physics', 'Theoretical and Applied Physics', 'PHY', 'fac-004', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-009', 'English Literature', 'English Language and Literature', 'ENG-LIT', 'fac-005', CURRENT_TIMESTAMP, NULL, NULL, false),
('maj-010', 'Psychology', 'Behavioral and Cognitive Psychology', 'PSY', 'fac-005', CURRENT_TIMESTAMP, NULL, NULL, false);

-- Insert Courses
INSERT INTO m_courses (id, name, credits, created_at, update_at, delete_at, is_deleted) VALUES
('crs-001', 'Programming Fundamentals', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-002', 'Data Structures and Algorithms', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-003', 'Database Systems', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-004', 'Web Development', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-005', 'Software Engineering Principles', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-006', 'Computer Networks', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-007', 'Operating Systems', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-008', 'Digital Logic Design', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-009', 'Circuit Analysis', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-010', 'Signal Processing', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-011', 'Business Management', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-012', 'Marketing Strategy', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-013', 'Financial Accounting', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-014', 'Statistics', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-015', 'Linear Algebra', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-016', 'Calculus I', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-017', 'Physics I', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-018', 'Physics II', 4, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-019', 'English Composition', 3, CURRENT_TIMESTAMP, NULL, NULL, false),
('crs-020', 'Research Methods', 3, CURRENT_TIMESTAMP, NULL, NULL, false);

-- Insert Curriculums
INSERT INTO m_curiculumns (id, name, year, major_id, created_at, update_at, delete_at, is_deleted) VALUES
('cur-001', 'Computer Engineering Year 1', 1, 'maj-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-002', 'Computer Engineering Year 2', 2, 'maj-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-003', 'Computer Engineering Year 3', 3, 'maj-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-004', 'Computer Engineering Year 4', 4, 'maj-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-005', 'Software Engineering Year 1', 1, 'maj-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-006', 'Software Engineering Year 2', 2, 'maj-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-007', 'Software Engineering Year 3', 3, 'maj-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-008', 'Software Engineering Year 4', 4, 'maj-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-009', 'Business Administration Year 1', 1, 'maj-005', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-010', 'Business Administration Year 2', 2, 'maj-005', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-011', 'Mathematics Year 1', 1, 'maj-007', CURRENT_TIMESTAMP, NULL, NULL, false),
('cur-012', 'Mathematics Year 2', 2, 'maj-007', CURRENT_TIMESTAMP, NULL, NULL, false);

-- Insert Curriculum-Course relationships (Many-to-Many)
INSERT INTO curriculumn_courses (curriculumn_id, course_id) VALUES
-- Computer Engineering Year 1
('cur-001', 'crs-001'), ('cur-001', 'crs-008'), ('cur-001', 'crs-016'), ('cur-001', 'crs-017'),
-- Computer Engineering Year 2
('cur-002', 'crs-002'), ('cur-002', 'crs-007'), ('cur-002', 'crs-009'), ('cur-002', 'crs-018'),
-- Computer Engineering Year 3
('cur-003', 'crs-003'), ('cur-003', 'crs-006'), ('cur-003', 'crs-010'), ('cur-003', 'crs-014'),
-- Computer Engineering Year 4
('cur-004', 'crs-005'), ('cur-004', 'crs-020'),
-- Software Engineering Year 1
('cur-005', 'crs-001'), ('cur-005', 'crs-016'), ('cur-005', 'crs-019'), ('cur-005', 'crs-014'),
-- Software Engineering Year 2
('cur-006', 'crs-002'), ('cur-006', 'crs-003'), ('cur-006', 'crs-004'), ('cur-006', 'crs-015'),
-- Software Engineering Year 3
('cur-007', 'crs-005'), ('cur-007', 'crs-006'), ('cur-007', 'crs-007'), ('cur-007', 'crs-020'),
-- Software Engineering Year 4
('cur-008', 'crs-020'),
-- Business Administration Year 1
('cur-009', 'crs-011'), ('cur-009', 'crs-013'), ('cur-009', 'crs-014'), ('cur-009', 'crs-019'),
-- Business Administration Year 2
('cur-010', 'crs-012'), ('cur-010', 'crs-020'),
-- Mathematics Year 1
('cur-011', 'crs-015'), ('cur-011', 'crs-016'), ('cur-011', 'crs-014'), ('cur-011', 'crs-017'),
-- Mathematics Year 2
('cur-012', 'crs-018'), ('cur-012', 'crs-020');

-- Insert Students
INSERT INTO m_students (id, name, email, student_identity, major_id, created_at, update_at, delete_at, is_deleted) VALUES
('std-001', 'John Doe', 'john.doe@student.ac.id', 20210001, 'maj-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-002', 'Jane Smith', 'jane.smith@student.ac.id', 20210002, 'maj-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-003', 'Michael Johnson', 'michael.johnson@student.ac.id', 20210003, 'maj-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-004', 'Emily Brown', 'emily.brown@student.ac.id', 20210004, 'maj-005', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-005', 'David Wilson', 'david.wilson@student.ac.id', 20210005, 'maj-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-006', 'Sarah Davis', 'sarah.davis@student.ac.id', 20210006, 'maj-007', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-007', 'Robert Miller', 'robert.miller@student.ac.id', 20210007, 'maj-002', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-008', 'Lisa Anderson', 'lisa.anderson@student.ac.id', 20210008, 'maj-004', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-009', 'James Taylor', 'james.taylor@student.ac.id', 20210009, 'maj-006', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-010', 'Jennifer White', 'jennifer.white@student.ac.id', 20210010, 'maj-008', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-011', 'William Garcia', 'william.garcia@student.ac.id', 20210011, 'maj-009', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-012', 'Ashley Martinez', 'ashley.martinez@student.ac.id', 20210012, 'maj-010', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-013', 'Christopher Lee', 'christopher.lee@student.ac.id', 20210013, 'maj-001', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-014', 'Amanda Rodriguez', 'amanda.rodriguez@student.ac.id', 20210014, 'maj-003', CURRENT_TIMESTAMP, NULL, NULL, false),
('std-015', 'Daniel Hernandez', 'daniel.hernandez@student.ac.id', 20210015, 'maj-005', CURRENT_TIMESTAMP, NULL, NULL, false);