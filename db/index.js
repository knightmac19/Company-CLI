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

const addDepartment = dept => {
    console.log(dept)
    return connection.query(
        `
        INSERT INTO departments (department) values ('${dept.trim()}');
        `
    );
};

const addRole = obj => {
    return connection.query(
        `
        INSERT INTO role 
        (title, salary, departments_id) 
        values ('${obj.title.trim()}', ${obj.salary}, ${obj.department});
        `
    );
};

const addEmployee = obj => {
    return connection.query(
        `
        INSERT INTO employee 
        (first_name, last_name, role_id, manager_id) 
        values ('${obj.first_name.trim()}', '${obj.last_name.trim()}', ${obj.title}, ${obj.manager});
        `
    );
}

const updateEmployeeAll = (obj, id) => {
    return connection.query(
        `
        UPDATE employee
        SET 
        first_name = '${obj.first_name}', 
        last_name = '${obj.last_name}',
        role_id = '${obj.role}',
        manager_id = '${obj.manager}'
        WHERE id = ${id};
        `
    );
}

const updateEmployeeName = (obj, id) => {
    return connection.query(
        `
        UPDATE employee
        SET 
        first_name = '${obj.first_name}', 
        last_name = '${obj.last_name}'
        WHERE id = ${id};
        `
    );
}

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees,
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee,
    updateEmployeeAll: updateEmployeeAll,
    updateEmployeeName: updateEmployeeName
}