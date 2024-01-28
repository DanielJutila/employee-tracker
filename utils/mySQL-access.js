const db = require('../server.js');
function databaseAccess(data){
    switch(data) {
        case 'view all departments':
            
            break;
        case 'view all roles':
            break;
        case 'view all employees':
            break;
        case 'add a department':
            break;
        case 'add a role':
            break;
        case 'add an employee':
            break;
        case 'update an employee role':
            break;
        default:
            console.log('Invalid choice');
    }
}



module.exports = databaseAccess;