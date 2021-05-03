const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');
const store = require('./db/index');

const init = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'exit',
        ],
    }).then((answer) => {
        switch (answer.action) {
            case 'View Departments':
                viewDepartments();
                break;

            case 'View Roles':
                console.log('view roles');
                break;

            case 'View Employees':
                console.log('view employees');
                break;

            case 'Exit':
                connection.end();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;
        }
    });
};

async function viewDepartments() {
    let departments = await store.viewDepartments();

    console.log('\n');
    console.table(departments);
    init();
}

init();