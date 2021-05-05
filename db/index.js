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
        SELECT e1.id AS ID, 
        CONCAT(e1.first_name, " ", e1.last_name) AS Employee, 
        role.title AS Title,
        departments.department AS Department,
        CONCAT(e2.first_name, " ", e2.last_name) AS Manager
        FROM employee e1
        LEFT JOIN employee e2
        ON e1.manager_id = e2.id
        LEFT JOIN role 
        ON e1.role_id = role.id
        LEFT JOIN departments 
        ON role.departments_id = departments.id;`
    );
};

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees
}