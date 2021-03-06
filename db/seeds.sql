INSERT INTO departments (dptname)
VALUES
    ('Engineering'),
    ('Human Resources'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Engineer', 120000.00, 1),
    ('Engineer', 90000.00, 1),
    ('General Manager', 150000.00, 2),
    ('Office Manager', 100000.00, 2),
    ('Sales Lead', 120000.00, 3),
    ('Sales Associate', 90000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jacob', 'Smith', 1, NULL),
    ('Samantha', 'Stewart', 2, 1),
    ('Jonathan', 'Newbold', 3, NULL),
    ('Alfred', 'Remington', 4, 3),
    ('Lexie', 'Arlington', 5, NULL),
    ('Shaun', 'Yuri', 6, 5);