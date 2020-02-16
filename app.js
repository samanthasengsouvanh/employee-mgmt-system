const mysql = require("mysql");
const inquirer = require("inquirer");

//database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "employee_db"
});
connection.connect(function (err) {
  if (err) throw err;
  start();
});

//prompt chain start
function start() {
  inquirer.prompt([
    {
      type: "list",
      choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "Exit"],
      message: "Welcome to the Employee Tracker 9000! What would you like to do?",
      name: "action"
    }
  ]).then(answer => {
    switch (answer.action) {
      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "View Departments":
        viewDepartments();
        break;

      case "View Roles":
        viewRoles();
        break;

      case "View Employees":
        viewEmployees();
        break;

      case "Update Employee Role":
        updateEmployeeRole();
        break;

      default:
        exit();
    };
  });
};

//add department function
const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department"
    }
  ]).then(answer => {
    const query = `INSERT INTO departments (department_name) VALUES("${answer.department}")`
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res)
      start();
    })
  });
}

//add role function
const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "what is the title of the new role?",
      name: "title"
    },
    {
      type: "number",
      message: "what is the salary of the new role?",
      name: "salary"
    },
    {
      type: "number",
      message: "what is the department ID that you would like to add this role to?",
      name: "department_id"
    }
  ]).then(answer => {
    const query = `INSERT INTO employee_roles (title, salary, department_id) VALUE ("${answer.title}", "${answer.salary}", "${answer.department_id}")`
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res)
      start();
    });
  });
};

//add employee function
const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "what the first name of the new employee?",
      name: "first_name"
    },
    {
      type: "input",
      message: "what the last name of the new employee?",
      name: "last_name"
    },
    {
      type: "number",
      message: "what is the role ID of the new employee?",
      name: "role_id"
    },
    {
      type: "number",
      message: "what is the manager ID of the new employee?",
      name: "manager_id"
    }
  ]).then(answer => {
    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res)
      start();
    });
  });
};

//view departments function
const viewDepartments = () => {
  const query = "SELECT * FROM departments"
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    start();
  });
};

//view employee roles function
const viewRoles = () => {
  const query = "SELECT * FROM employee_roles"
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewEmployees = () => {
  const query = "SELECT * FROM employees"
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const updateEmployeeRole = () => {
  // update the employee role
  connection.query("SELECT *  FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer.prompt([
      {
        type: "Number",
        message: "What is the ID of the employee you would you like to update?",
        name: "id"
      },
      {
        type: "number",
        message: "What new role ID would you like to assign the employee?",
        name: "role_id"
      }
    ]).then(answer => {
      const query = `UPDATE employees SET role_id = "${answer.role_id}" WHERE id = ${answer.id}`
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Employee role updated!");
        start();
      });
    })
  });
};

const exit = () => {
  connection.end()
  process.exit()
}