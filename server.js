const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const dbAccess = require('./utils/databaseFunctions');


const dbPromise = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db'
  });
  
  dbPromise.then((db) => {
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
        if(answers.option == 'add a department'){
          const departmentName = await addDepartment();
          answers.dName = departmentName;
        }
        if(answers.option == 'add a role'){
          addRole();
        }
        if(answers.option == 'add a employee'){
          addEmployee();
        }
        const db = await dbPromise;
        try {
          console.log(answers.dName);
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
  const roleName = await inquirer.prompt({
    type: 'input',
    name: 'rName',
    message: 'Enter the name of the role:'
  });
}
async function addEmployee() {
  const employeeName = await inquirer.prompt({
    type: 'input',
    name: 'eName',
    message: 'Enter the name of the employee:'
  });
}
init();
// SELECT e.id, e.first_name, e.last_name, r.title AS role_title, e.manager_id
// FROM employee e
// JOIN roles r ON e.role_id = r.id;

// SELECT e.id AS employee_id, e.first_name, e.last_name,
//        r.title AS role_title, r.salary,
//        d.name AS department_name
// FROM employee e
// JOIN roles r ON e.role_id = r.id
// JOIN department d ON r.department_id = d.id;



// try {
//     const [rows] = await db.query('SELECT id, name FROM department');
//     if (rows.length > 0) {
//       console.log('ID    Department Name');
//       console.log('--    ---------------');
//       rows.forEach(row => {
//         console.log(`${row.id}     ${row.name}`);
//       });
//     }
// } catch (error) {
//   console.error('Error executing query:', error);
// }