INSERT INTO departments (id, name) VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Marketing'),
  (4, 'Customer Service'),
  (5, 'Finance'),
  (6, 'Legal');

INSERT INTO roles (id, title, salary, department_id) VALUES
  (1, 'Sales Lead', 100000, 1),
  (2, 'Software Engineer', 90000, 2),
  (3, 'Marketing Specialist', 80000, 3),
  (4, 'Customer Service Representative', 50000, 4),
  (5, 'Financial Analyst', 95000, 5),
  (6, 'Legal Counsel', 110000, 6),
  (7, 'Account Executive', 80000, 1),
  (8, 'Software Developer', 85000, 2),
  (9, 'Digital Marketing Manager', 90000, 3),
  (10, 'Technical Support Specialist', 55000, 4),
  (11, 'Financial Controller', 120000, 5),
  (12, 'Legal Assistant', 60000, 6);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Lionel', 'Messi', 1, NULL),
(2, 'Cristiano', 'Ronaldo', 2, 1),
(3, 'Neymar', NULL, 3, 1),
(4, 'Mohamed', 'Salah', 4, 1),
(5, 'Kylian', 'Mbappe', 5, 1),
(6, 'Luka', 'Modric', 6, 1),
(7, 'Robert', 'Lewandowski', 7, NULL),
(8, 'Sergio', 'Ramos', 8, 7),
(9, 'Kevin', 'De Bruyne', 9, 7),
(10, 'Harry', 'Kane', 10, 7),
(11, 'Virgil', 'van Dijk', 11, 7),
(12, 'Manuel', 'Neuer', 12, 7);