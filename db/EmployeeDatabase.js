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
            ORDER BY id
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
            ORDER BY id
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

//The EmployeeDatabase class is defined, extending the Database class using the extends keyword. It inherits the properties and methods from the Database class.
//The constructor method of EmployeeDatabase calls the parent class constructor (super(options)) to initialize the database connection using the provided options.
//The executeQuery method is defined to execute a SQL query asynchronously using the db.query method provided by the mysql2 library. It returns a promise that resolves with the query results or rejects with an error.
//The getDepartments, getRoles, and getEmployees methods retrieve the corresponding data from the database by executing the respective SQL queries asynchronously using the executeQuery method.
//The addDepartment, addRole, and addEmployee methods insert new department, role, and employee records into the database using the INSERT INTO SQL statements. 
//They use the executeQuery method to execute the queries with the necessary parameters.
//The updateEmployeeRole method updates the role of an employee in the database using the UPDATE SQL statement. 
//It uses the executeQuery method to execute the query with the necessary parameters.
//Each method wraps the database query execution in a try-catch block to handle any errors that may occur. If an error occurs, it is thrown and propagated to the calling code.
//Finally, the EmployeeDatabase class is exported as a module using module.exports, making it available for use in other files.
//In summary, this code extends the Database class to create an EmployeeDatabase class that provides methods for interacting with an employee database. 
//It encapsulates the execution of SQL queries and handles any errors that may occur during the process.