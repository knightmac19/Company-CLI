const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');
const store = require('./db/index');

const checkName = str => {
    let pass = str.match(/[A-Za-z ]/);

    if (pass && pass.length < 30) {
        return true;
    }
    return 'Only letters & spaces. Max 30 characters.'
};

const checkNumeric = (num) => {
    let pass = num.match(/[0-9]/);

    if (pass && pass <= 8) {
        return true;
    }
    return 'Only numeric characters. Max 8 figures.';
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
            'Add Role',
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
            
            case 'Add Role':
                addRole();
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

const createDepts = (arr) => {
    let result = [];
    for (var i = 0; i < arr.length; i++) {
        let obj = {
            id: arr[i].id,
            name: arr[i].department
        }
        result.push(obj)
    }
    // console.log(result)
    return result;
}

async function addRole() {
    let departments = await store.viewDepartments();

    let deptArray = departments.map(({ id, department }) => ({
        name: department,
        value: id
    }));

    let details = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
            validate: a => checkName(a)   
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please write the salary.',
            validate: a => checkNumeric(a)   
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to?',
            choices: deptArray
        },
    ]);

    await store.addRole(details);

    let roles = await store.viewRoles()

    console.log('\n');
    console.table(roles)

    init();

}

init();