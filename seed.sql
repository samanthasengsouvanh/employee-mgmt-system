-- seed is used to prepopulate the table
use employee_db;

-- populate departments
INSERT INTO departments (department_name)
VALUES ("Finance"), ("Operations Management"), ("Human Resources"), ("Marketing"), ("IT");

-- populate employee_roles
INSERT INTO employee_roles (title, salary, department_id)
VALUE ("Financial Analyst", 90000, 1), ("Operations Manager", 65000, 2), ("HR Generalist", 70000, 3), ("Market Manager", 80000, 4), ("Network Engineer", 50000, 5);

-- populate employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUE ("Bob", "Ross", 1, NULL), ("Steve", "Austin", 2, 1), ("Roger", "Smith", 3, 2), ("Ira", "Smith", 3, 2), ("Marge", "Simpson", 4, 3), ("Lois", "Griffin", 4, 3), ("Tina", "Belcher", 5, 4), ("Jeremy", "Clarkson", 5, 4);
