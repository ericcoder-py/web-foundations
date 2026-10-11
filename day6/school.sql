-- Drop tables if they already exist to allow clean re-runs
DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

-- 1. Students Table
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- 2. Courses Table
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    credits INTEGER NOT NULL
);

-- 3. Enrolments Table (Join table linking students and courses with a unique constraint to prevent duplicate enrolments)
CREATE TABLE enrolments (
    enrolment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id)
);

-- --- INSERT SAMPLE DATA ---

-- Insert at least 3 students
INSERT INTO students (name, email) VALUES 
('Alice Smith', 'alice@example.com'),
('Bob Jones', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('Diana Prince', 'diana@example.com'); -- 4th student added to test the "no enrolments" query

-- Insert at least 3 courses
INSERT INTO courses (course_code, title, credits) VALUES 
('CS101', 'Introduction to Computer Science', 3),
('MTH201', 'Linear Algebra and Calculus', 4),
('ENG102', 'Academic Writing and Communication', 3);

-- Insert 5 enrolments (linking students to courses)
INSERT INTO enrolments (student_id, course_id, grade) VALUES 
(1, 1, 'A'),
(1, 2, 'B+'),
(2, 1, 'A-'),
(2, 3, 'B'),
(3, 2, 'C+');


-- --- FIVE REQUIRED QUERIES ---

-- 1. All courses for one student (by name, e.g., 'Alice Smith')
SELECT s.name AS student_name, c.course_code, c.title, e.grade 
FROM students s
JOIN enrolments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.name = 'Alice Smith';

-- 2. All students on one course (by course code, e.g., 'CS101')
SELECT c.course_code, c.title, s.name AS student_name, s.email, e.grade
FROM courses c
JOIN enrolments e ON c.course_id = e.course_id
JOIN students s ON e.student_id = s.student_id
WHERE c.course_code = 'CS101';

-- 3. The number of students per course
SELECT c.course_code, c.title, COUNT(e.student_id) AS total_students
FROM courses c
LEFT JOIN enrolments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_code, c.title;

-- 4. Students who have no enrolments (using LEFT JOIN)
SELECT s.student_id, s.name, s.email
FROM students s
LEFT JOIN enrolments e ON s.student_id = e.student_id
WHERE e.enrolment_id IS NULL;

-- 5. Update of one enrolment's grade
UPDATE enrolments 
SET grade = 'A+' 
WHERE student_id = 1 AND course_id = 1;