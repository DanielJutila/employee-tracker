function databaseAccess(data, db) {

  switch (data.option) {
    case 'view all departments':
      viewDatabase(db);
      break;
    case 'view all roles':
      viewAllRoles(db);
      break;
    case 'view all employees':
      viewAllEmployees(db);
      break;
    case 'add a department':
      addDepartment(data, db);
      break;
    case 'add a role':
      addRole(data, db);
      break;
    case 'add an employee':
      addEmployee(data, db);
      break;
    case 'update an employee role':
      break;
    default:
      console.log('Error, no option found');
  }
}
async function addEmployee(answers, db) {
  try {
    const { eFirstName, eLastName, eRoleID } = answers;
    const query = 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)'
    await db.query(query, [eFirstName, eLastName, eRoleID]);
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}
async function addRole(answers, db) {
  try {
    const { rName, rSalary, rDepartment } = answers;
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    await db.query(query, [rName, rSalary, rDepartment]);
    console.log('Role added successfully.');
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

async function addDepartment(answers, db) {
  try {
    const departmentName = answers.dName;
    const query = 'INSERT INTO department (name) VALUES (?)';
    await db.query(query, [departmentName]);
    console.log('Department added successfully.');
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

async function viewDatabase(db) {
  const [rows] = await db.query('SELECT id, name FROM department');
  if (rows.length > 0) {
    console.log(' ');
    console.log('ID    Department Name');
    console.log('--    ---------------');
    rows.forEach(row => {
      console.log(`${row.id}     ${row.name}`);
    });
  }
}
async function viewAllRoles(db) {
  const [rows] = await db.query(`
  SELECT r.id, r.title, r.salary, d.name AS department
  FROM roles AS r
  LEFT JOIN department AS d ON r.department_id = d.id
  `);
  if (rows.length > 0) {
    console.log(' ');
    console.log('ID   Title                 Department       Salary');
    console.log('--   -----                 ----------       ------');
    rows.forEach(row => {
      console.log(`${row.id}    ${row.title.padEnd(20)} ${row.department.padEnd(15)} ${row.salary}`);
    });
  }
}

async function viewAllEmployees(db) {
  const [rows] = await db.query(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
           CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee AS e
    INNER JOIN roles AS r ON e.role_id = r.id
    INNER JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id
  `);
  if (rows.length > 0) {
    console.log(' ');
    console.log('ID   First Name   Last Name   Title              Department         Salary      Manager');
    console.log('--   ----------   ---------   -----              ----------         ------      -------');
    rows.forEach(row => {
      console.log(`${row.id}    ${row.first_name.padEnd(12)} ${row.last_name.padEnd(11)} ${row.title.padEnd(18)} ${row.department.padEnd(18)} ${row.salary.padEnd(10)} ${row.manager ? row.manager : '-'}`);
    });
  }
}

module.exports = databaseAccess;