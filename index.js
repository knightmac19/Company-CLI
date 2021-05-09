const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');
// const { updateEmployeeName } = require('./db/index');
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
            'Update Employee',
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

            case 'Update Employee':
                updateEmployee();
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
    managersArr.unshift({name: 'No Manager', value: 0});
    
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

    init();
}

async function updateAll(obj) {

    let managers = await store.viewEmployees();

    let managersArr = managers.map(({ ID, Employee }) => ({
        name: Employee,
        value: ID
    }));
    managersArr.unshift({name: 'No Manager', value: 0});

    let roles = await store.viewRoles();

    let rolesArr = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    let details = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s updated first name?',
            validate: a => checkName(a)   
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s updated last name?',
            validate: a => checkName(a)   
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s updated role?',
            choices: rolesArr
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s updated manager?',
            choices: managersArr
        }
    ]);
    

    await store.updateEmployeeAll(details, obj.id)

    viewEmployees();
}

async function updateEmployeeName(obj) {

    let details = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s updated first name?',
            validate: a => checkName(a)   
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s updated last name?',
            validate: a => checkName(a)   
        }
    ]);
    

    await store.updateEmployeeName(details, obj.id)

    viewEmployees();
}

async function updateEmployeeRole(obj) {

    let roles = await store.viewRoles();

    let rolesArr = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    let details = await inquirer.prompt({

        type: 'list',
        name: 'role',
        message: 'What is the employee\'s updated role?',
        choices: rolesArr

    });
    

    await store.updateEmployeeRole(details, obj.id)

    viewEmployees();
    
}

async function updateEmployeeManager(obj) {

    let managers = await store.viewEmployees();

    let managersArr = managers.map(({ ID, Employee }) => ({
        name: Employee,
        value: ID
    }));
    managersArr.unshift({ name: 'No Manager', value:0 });

    let details = await inquirer.prompt({

        type: 'list',
        name: 'manager',
        message: 'Who is the employee\'s updated manager?',
        choices: managersArr

    });
    

    await store.updateEmployeeManager(details, obj.id)

    viewEmployees();
    
}

async function updateEmployee() {
    let employees = await store.viewEmployees();

    let employeesArr = employees.map(({ ID, Employee }) => ({
        name: Employee,
        value: ID
    }));

    let employeeID = await inquirer.prompt({
        name: 'id',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: employeesArr
    });

    await inquirer.prompt({
        name: 'action',
        type:'list',
        message: 'Which field(s) would you like to update?',
        choices: [
            'Update All Fields',
            'Update Name',
            'Update Role',
            'Update Manager',
            'Return to Main Menu',
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'Update All Fields':
                updateAll(employeeID);
                break;
            
            case 'Update Name':
                updateEmployeeName(employeeID);
                break;

            case 'Update Role':
                updateEmployeeRole(employeeID);
                break;

            case 'Update Manager':
                updateEmployeeManager(employeeID);
                break;
        }
    });
}

init();