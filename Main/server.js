const express = require("express");
const inquirer = require("inquirer");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    user: "postgres",
    password: "DanOli0518",
    host: "localhost",
    database: "employee_db",
  },
  console.log(`Connected to the Employee database.`)
);

pool.connect(function (err) {
  if (err) throw err;
  console.log("*************************************");
  console.log("                                     ");
  console.log("          EMPLOYEE DATABASE          ");
  console.log("                                     ");
  console.log("*************************************");
  commandPrompt();
});

function commandPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "intro",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.intro) {
        case "View All Departments":
          view_Departments();
          break;
        case "View All Roles":
          view_Roles();
          break;
        case "View All Employees":
          view_Employees();
          break;
        case "Add a Department":
          add_Department();
          break;
        case "Add a Role":
          add_Role();
          break;
        case "Add an Employee":
          add_Employee();
          break;
        case "Update an Employee Role":
          update_Role();
          break;
        case "Quit":
          console.log("Good-Bye!");
          pool.end();
          break;
      }
    });
}

function view_Departments() {
    const sql = `SELECT department.id, department.department_name AS Department FROM department`;
    pool.query(sql, (err, {rows}) => {
      if (err) {
        
      }
      console.table(rows);
      commandPrompt();
    });
};

function view_Roles() {
  const sql = `SELECT roles.id, roles.title, department.department_name AS department, roles.salary 
                FROM roles INNER JOIN department ON roles.department_id = department.id`;
  pool.query(sql, (err, {rows}) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    commandPrompt();
  });
}

function view_Employees() {
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, department.department_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name)AS manager FROM employees INNER JOIN employees manager ON manager.id = employees.manager_id INNER JOIN roles ON roles.id = employees.role_id INNER JOIN department ON department.id = roles.department_id ORDER BY employees.id;`;
  pool.query(sql, (err, {rows}) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    commandPrompt();
  });
}

function add_Department() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (department_name) VALUES('${answer.department}');`;
      pool.query(sql, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log("Added " + answer.department + " to the database");
        commandPrompt();
      });
    });
}

function add_Role() {
  const sql = `SELECT * FROM department`;
  pool.query(sql, (req, res) => {
    const departmentList = res.rows.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));
    return inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which Department does the role belong to?",
          choices: departmentList,
        },
      ])
      .then((answers) => {
        const sql2 = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}','${answers.salary}','${answers.department_id}');`;
        pool.query(sql2, (err, res) => {
          if (err) {
            console.log(err);
          }else{
            console.log("Added " + answers.title + " to the database");
          }
          commandPrompt();
        });
      });
  });
};

function add_Employee() {
  const sql = `SELECT * FROM employees`;

  pool.query(sql, (req, res) => {
    const employeeList = res.rows.map((employee) => ({
      name: employee.first_name.concat(" ", employee.last_name),
      value: employee.id,
    }));

    const sql2 = `SELECT * FROM roles`;
    pool.query(sql2, (req, res) => {
      const roleList = res.rows.map((roles) => ({
        name: roles.title,
        value: roles.id,
      }));
      return inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: employeeList,
          },
        ])
        .then((answers) => {
          const sql3 = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES('${answers.first_name}','${answers.last_name}','${answers.role_id}','${answers.manager_id}');`;
          pool.query(sql3, (err, res) => {
            if (err) {
              console.log(err);
            }
            console.log("Added " + answers.first + " " + answers.last + " to the database"
            );
            commandPrompt();
          });
        });
    });
  
  });
};

function update_Role() {
  const sql = `SELECT * FROM employees`;
  pool.query(sql, (req, res) => {

    
    const employeeList = res.rows.map((employees) => ({
      name: employees.first_name.concat(" ", employees.last_name),
      value: employees.id,
    }));
    const sql2 = `SELECT * FROM roles`;
    pool.query(sql2, (req, res) => {
      roleList = res.rows.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      return inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which employee's role do you want to update?",
            choices: employeeList,
          },
          {
            type: "list",
            name: "role_id",
            message: "Which role do you want to assign the selected employee?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who will be this employee's manager?",
            choices: employeeList,
          },
        ])
        .then((answers) => {
          const sql3 = `UPDATE employees SET role_id= ${answers.role_id}, manager_id=${answers.manager_id} WHERE id =${answers.id};`;
          pool.query(sql3, (err, res) => {
            if (err) {
              console.log(err);
            }
            console.log("Employee role updated");
            commandPrompt();
          });
        });
    });
  });
}

app.use((req, res) => {
  res.status(404).end();
});



app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
