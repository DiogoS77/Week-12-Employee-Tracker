const Database = require('./Database.js');

class EmployeeDatabase extends Database {
    constructor(options) {
        super(options);
    }

    async executeQuery(query, params) {
        try {
            const results = await new Promise((resolve, reject) => {
                this.db.query(query, params, (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });
            });
            return results;
        } catch (error) {
            throw error;
        }
    }

    async getDepartments() {
        const query = 'SELECT * FROM department';
        try {
            const results = await this.executeQuery(query);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async getRoles() {
        const query = `
            SELECT role.id, role.title, CONCAT('£', FORMAT(salary, 0), 'p/a') as salary, department.name as department_name
            FROM role
            INNER JOIN department ON role.department_id = department.id
        `;
        try {
            const results = await this.executeQuery(query);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async getEmployees() {
        const query = `
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
        `;
        try {
            const results = await this.executeQuery(query);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async addDepartment(department) {
        const query = 'INSERT INTO department SET ?';
        const params = { name: department.department_name };
        try {
            await this.executeQuery(query, params);
            return `Department ${department.department_name} added successfully`;
        } catch (error) {
            throw error;
        }
    }

    async addRole(role) {
        const query = 'INSERT INTO role SET ?';
        const params = {
            title: role.title,
            salary: role.salary,
            department_id: role.department_id
        };
        try {
            await this.executeQuery(query, params);
            return `Role ${role.title} added successfully`;
        } catch (error) {
            throw error;
        }
    }

    async addEmployee(employee) {
        const query = 'INSERT INTO employee SET ?';
        const params = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            role_id: employee.role_id,
            manager_id: employee.manager_id
        };
        try {
            await this.executeQuery(query, params);
            return `${employee.first_name} ${employee.last_name} added successfully`;
        } catch (error) {
            throw error;
        }
    }

    async updateEmployeeRole(employee) {
        const query = 'UPDATE employee SET role_id=? WHERE id=?';
        const params = [employee.role_id, employee.employee_id];
        try {
            const results = await this.executeQuery(query, params);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeDatabase;
