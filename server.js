const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const dbAccess = require('./utils/databaseFunctions');


const dbPromise = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employee_db'
});

dbPromise.then(() => {
  console.log('Connected to the employee_db database.');
}).catch((err) => {
  console.error('Error connecting to database:', err);
});


const questions = [{
  type: 'list',
  name: 'option',
  message: 'What would you like to do?',
  choices: [
    'view all departments',
    'view all roles',
    'view all employees',
    'add a department',
    'add a role',
    'add an employee',
    'update an employee role']
}];

function init() {

  inquirer
    .prompt(questions)
    .then(async (answers) => {
      if (answers.option == 'add a department') {
        const departmentName = await addDepartment();
        answers.dName = departmentName;
      }
      if (answers.option == 'add a role') {
        const roleName = await addRole();
        answers.rName = roleName.rName;
        answers.rSalary = roleName.rSalary;
        answers.rDepartment = roleName.rDepartment;
      }
      if (answers.option == 'add an employee') {
        const employeeName = await addEmployee();
        answers.eFirstName = employeeName.eFirstName;
        answers.eLastName = employeeName.eLastName;
        answers.eRoleID = employeeName.eRoleID;
      }
      try {
        const db = await dbPromise;
        dbAccess(answers, db);
        
      } catch (error) {
        console.error('Error executing query:', error);
      }
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

async function addDepartment() {
  const departmentName = await inquirer.prompt({
    type: 'input',
    name: 'dName',
    message: 'Enter the name of the department:'
  });
  return departmentName.dName;
}

async function addRole() {
  const roleName = await inquirer.prompt([
    {
      type: 'input',
      name: 'rName',
      message: 'Enter the name of the role:'
    },
    {
      type: 'input',
      name: 'rSalary',
      message: 'How much money a year'
    },
    {
      type: 'input',
      name: 'rDepartment',
      message: 'Department ID',
    }
  ]);
  return roleName;
}
async function addEmployee() {
  const employeeName = await inquirer.prompt([
    {
      type: 'input',
      name: 'eFirstName',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'eLastName',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'input',
      name: 'eRoleID',
      message: 'Enter the role ID of the employee:'
    },
  ]);
  return employeeName;
}
init();