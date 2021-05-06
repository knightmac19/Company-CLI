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
    if (isNaN(num) || num.toString().length > 9) {
        return 'Please enter a number up to 9 digits (no commas).';
    }
    return true;
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
            'Add Employee',
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

            case 'Add Employee':
                addEmployee();
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
        }
    ]);

    await store.addRole(details);

    let roles = await store.viewRoles()

    console.log('\n');
    console.table(roles)

    init();

}

async function addEmployee() {
    let managers = await store.viewEmployees();

    let managersArr = managers.map(({ ID, Employee }) => ({
        name: Employee,
        value: ID
    }));
    managersArr.unshift({name: 'No Manager', value: null});
    
    let roles = await store.viewRoles();

    let rolesArr = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    
    // console.log(managersArr)
    // console.log('\n')
    // console.log(rolesArr)
    
    let details = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?',
            validate: a => checkName(a)   
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?',
            validate: a => checkName(a)   
        },
        {
            type: 'list',
            name: 'title',
            message: 'What is the employee\'s role?',
            choices: rolesArr
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: managersArr
        }
    ]);

    await store.addEmployee(details);

    let employees = await store.viewEmployees();
    
    console.log('\n');
    console.table(employees);

    init()
}

init();