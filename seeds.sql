-- Seed data for departments
INSERT INTO department (name) VALUES 
('Human Resources'),
('Finance'),
('Marketing'),
('Engineering');

INSERT INTO roles (title, salary, department_id) VALUES
('HR Manager', 60000.00, 1), -- HR Manager in Human Resources department
('Accountant', 50000.00, 2), -- Accountant in Finance department
('Marketing Specialist', 55000.00, 3), -- Marketing Specialist in Marketing department
('Software Engineer', 80000.00, 4), -- Software Engineer in Engineering department
('Sales Representative', 45000.00, 3), -- Sales Representative in Marketing department
('Financial Analyst', 60000.00, 2); -- Financial Analyst in Finance department

-- Seed data for employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), -- John Doe is the HR Manager
('Jane', 'Smith', 2, 1), -- Jane Smith is an Accountant reporting to John Doe
('Michael', 'Johnson', 3, NULL), -- Michael Johnson is the Marketing Specialist
('Emily', 'Brown', 4, NULL), -- Emily Brown is the Software Engineer
('David', 'Wilson', 5, NULL), -- David Wilson is the Sales Representative
('Sarah', 'Taylor', 6, NULL), -- Sarah Taylor is the Financial Analyst
('James', 'Anderson', 4, NULL), -- James Anderson is another Software Engineer
('Emma', 'Garcia', 5, NULL), -- Emma Garcia is another Sales Representative
('William', 'Martinez', 6, NULL); -- William Martinez is another Financial Analyst