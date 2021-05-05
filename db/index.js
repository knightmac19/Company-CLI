const connection = require('./connection');

const viewDepartments = () => {
    return connection.query('SELECT * FROM department');
};

const viewRoles = () => {
    return connection.query('SELECT * FROM role');
};

const viewEmployees = () => {
    return connection.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
        FROM employee 
        LEFT JOIN role 
        ON employee.role_id = role.id
        LEFT JOIN department 
        ON role.department_id = department.id;`
    );
};

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees
}