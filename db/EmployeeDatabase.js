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

    async addDepartment(department) {
        try {
            const results = await this.executeInsert('department', { name: department.department_name });
            return `Department ${department.department_name} added successfully`;
        } catch (error) {
            throw error;
        }
    }

    async addRole(role) {
        const roleData = {
            title: role.title,
            salary: role.salary,
            department_id: role.department_id
        };

        try {
            const results = await this.executeInsert('role', roleData);
            return `Role ${role.title} added successfully`;
        } catch (error) {
            throw error;
        }
    }

    async addEmployee(employee) {
        const employeeData = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            role_id: employee.role_id,
            manager_id: employee.manager_id
        };

        try {
            const results = await this.executeInsert('employee', employeeData);
            return `${employee.first_name} ${employee.last_name} added successfully`;
        } catch (error) {
            throw error;
        }
    }

    async updateEmployeeRole(employee) {
        try {
            const results = await this.executeQuery('UPDATE employee SET role_id=? WHERE id=?', [employee.role_id, employee.employee_id]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeDatabase;
