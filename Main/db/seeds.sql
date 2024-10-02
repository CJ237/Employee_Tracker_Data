INSERT INTO department (department_name) 
VALUES ('Management'),
       ('Engineering'),
       ('Marketing'),
       ('Finance'),
       ('Sales'),
       ('Human Resources');
      

INSERT INTO roles (title, salary, department_id) VALUES
('Operations Manager', 200000.50, 1),
('Office Manager', 120000.50, 1),
('CEO', 3000000.50, 1),
('Marketing Manager', 72440.50, 3),
('Marketing Assistant', 67840.10, 3),
('Engineering Manager', 156300.00, 2),
('Software Engineering Lead', 212368.00, 2),
('Senior Engineer', 134490.50, 2),
('Junior Engineer', 43380.50, 2),
('Finance Manager', 54560.08, 4),
('Accountant', 65658.06, 4),
('Sales Manager', 67545.05, 5),
('Sales Assistant', 76742.50, 5),
('Sales Associate', 34334.00, 5),
('HR Manager', 43220.08, 6),
('HR Rep', 23448.69, 6);


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Isaac', 'I', 1, 3), 
('Noah', 'A', 2, 3), 
('Peter', 'S', 3, null), 
('Samson', 'H', 5, 6),
('Ezekiel', 'B', 5, 6),
('Isaiah', 'I', 5, 6),
('Thomas', 'J', 4, null), 
('James', 'K', 7, 9),
('Phillip', 'C', 6, null),
('Judas', 'L', 9, 9),
('Jobe', 'M', 9, 9),
('Paul', 'N', 8, 9),
('Mary', 'O', 8, 9),
('Joseph', 'P', 8, 9),
('Gamora', 'D', 10, null),
('Joshua', 'Q', 11, 15),
('Daniel', 'R', 11, 15),
('Mark', 'E', 12, null),
('Mathew', 'S', 13, 18),
('Luke', 'T', 14, 18),
('John', 'U', 14, 18),
('Jeremiah', 'F', 15, null),
('Timothy', 'U', 16, 22),
('Ruth', 'V', 16, 22),
('Ezra', 'W', 16, 22);