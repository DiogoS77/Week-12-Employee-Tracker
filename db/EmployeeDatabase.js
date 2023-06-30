const Database = require('./Database.js');

class EmployeeDatabase extends Database {
    constructor(options) {
        super(options);
    }

    async getDepartments() {
        try {
            const results = await this.executeQuery('SELECT * FROM department');
            return results;
        } catch (error) {
            throw error;
        }
    }

    async getRoles() {
        try {
            const results = await this.executeQuery(`
                SELECT role.id, role.title, CONCAT('£', FORMAT(salary, 0), 'p/a') as salary, department.name as department_name
                FROM role
                INNER JOIN department ON role.department_id = department.id
            `);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async getEmployees() {
        try {
            const results = await this.executeQuery(`
                SELECT
                employee.id,
                CONCAT(employee.first_name, ' ', employee.last_name) as name,
                role.title as role_title,
                role.salary as role_salary,
                department.name as department_name,
                IF(CONCAT(manager.first_name, ' ', manager.last_name) IS NULL, '', CONCAT(manager.first_name, ' ', manager.last_name)) as manager_name
                FROM employee
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
                LEFT JOIN employee as manager ON employee.manager_id = manager.id
            `);
            return results;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = EmployeeDatabase;
