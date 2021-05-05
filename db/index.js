const connection = require('./connection');

const viewDepartments = () => {
    return connection.query('SELECT * FROM departments');
};

const viewRoles = () => {
    return connection.query(`
        SELECT role.id, role.title, role.salary, departments.department 
        FROM role 
        LEFT JOIN departments 
        ON role.departments_id = departments.id;`
    );
};

const viewEmployees = () => {
    return connection.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.department 
        FROM employee 
        LEFT JOIN role 
        ON employee.role_id = role.id
        LEFT JOIN departments 
        ON role.departments_id = departments.id;`
    );
};

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees
}