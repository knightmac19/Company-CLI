const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');
const store = require('./db/index');

const checkName = str => {
    let pass = str.match(/[A-Z][A-Za-z]/);

    if (pass) {
        return true;
    }
    return 'Must start with capital letter, & only contain alphabetic characters'
};

const init = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Exit',
        ],
    }).then((answer) => {
        switch (answer.action) {
            case 'View Departments':
                viewDepartments();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'View Employees':
                viewEmployees();
                break;
            
            case 'Add Department':
                addDepartment();
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

async function viewRoles() {
    let roles = await store.viewRoles();

    console.log('\n');
    console.table(roles);
    init();
}

async function viewEmployees() {
    let employees = await store.viewEmployees();

    console.log('\n');
    console.table(employees);
    init();
}

async function addDepartment() {
    let details = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: a => checkName(a)   
        }
    ]);

    store.addDepartment(details.name);

    let departments = await store.viewDepartments()

    console.log('\n');
    console.table(departments)

    init();

}

init();