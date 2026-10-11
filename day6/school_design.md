# School Database Design

## Table Explanations

* **`students`**: Stores individual profile data for each student registered in the school. Each student has a unique identifier (`student_id`), a mandatory name, and a unique email address to prevent duplicate registrations.
* **`courses`**: Stores available academic courses offered by the institution. Each record includes a unique course ID, a unique course code (e.g., `CS101`), a title, and credit weight.
* **`enrolments`**: Acts as a bridge (junction) table to connect students to courses. It tracks which student takes which course and holds the specific grade obtained.

---

## Entity Relationships and Join Table Rationale

* **Relationship Type**: The relationship between `students` and `courses` is **many-to-many** (a single student can enroll in multiple courses, and a single course can have many students).
* **Why a Join Table is Needed**: Relational databases cannot directly handle many-to-many relationships within standard tables without causing data redundancy or format limitations. The `enrolments` join table breaks this many-to-many relationship down into two manageable **one-to-many** relationships:
  1. One `student` can have many `enrolments`.
  2. One `course` can have many `enrolments`.
  Additionally, the join table is the ideal location to store attributes specific to that relationship—such as the student's `grade`.

---

## Recommended Index

* **Index**: `CREATE INDEX idx_enrolments_student ON enrolments(student_id);`
* **Reason**: In a school environment, frequent lookups are performed to check a student's active courses, transcripts, and progress. Indexing the `student_id` column inside the `enrolments` table drastically speeds up search performance for queries filtering or joining by specific students, avoiding full table scans.

---

## Database Model Choice: SQL vs. NoSQL

For a school database managing students, courses, and structured relationships like enrolments and grades, **SQL (Relational Database)** is the optimal choice. SQL databases excel at maintaining data integrity through strict schemas, primary/foreign key constraints, and unique restrictions (such as preventing duplicate course enrolments or overlapping constraints). Features like ACID compliance ensure financial or academic records (grades and enrolments) are safely and accurately tracked without orphan records. NoSQL would only be preferred if schema flexibility for unstructured or highly variable student metadata was the primary requirement, which does not apply here.