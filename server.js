const inquirer = require('inquirer');
const mySQLAccess = require('./utils/mySQL-access');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Query database
db.query('SELECT * FROM employees', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const questions = [{
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
    'view all departments', 
    'view all roles', 
    'Aview all employees', 
    'add a department',
    'add a role',
    'add an employee',
    'update an employee role']
}];

function init() {
    inquirer
      .prompt(questions)
      .then((answers) => {
        mySQLAccess(answers);
      });
  }
init();

module.exports = db;

// SELECT e.id, e.first_name, e.last_name, r.title AS role_title, e.manager_id
// FROM employee e
// JOIN roles r ON e.role_id = r.id;

// SELECT e.id AS employee_id, e.first_name, e.last_name,
//        r.title AS role_title, r.salary,
//        d.name AS department_name
// FROM employee e
// JOIN roles r ON e.role_id = r.id
// JOIN department d ON r.department_id = d.id;