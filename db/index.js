const connection = require('./connection');

const viewDepartments = () => {
    return connection.query('SELECT * FROM department');
};

module.exports = {
    viewDepartments: viewDepartments
}