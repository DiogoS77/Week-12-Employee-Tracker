const inquirer = require('inquirer');
const { mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions } = require('./questions.js');
const EmployeeDatabase = require('./db/EmployeeDatabase.js');

const db = new EmployeeDatabase({
    host: 'localhost',
    user: 'root',
    password: 'Gogucho1971$',
    database: 'business_db',
});

db.connect();

const menuOptions = {
    'view_departments': view_departments,
    'view_roles': view_roles,
    'view_employees': view_employees,
    'add_department': add_department,
    'add_role': add_role,
    'add_employee': add_employee,
    'update_role': update_role,
};

const doMenuQuestions = async () => {
    const response = await inquirer.prompt(mainMenuQuestions);
    const selectedOption = response.option;
    const selectedFunction = menuOptions[selectedOption];
    if (selectedFunction) {
        selectedFunction();
    }
};

const view_departments = async () => {
    const results = await db.getDepartments();
    console.table(results);
    doMenuQuestions();
};

const view_roles = async () => {
    const results = await db.getRoles();
    console.table(results);
    doMenuQuestions();
};

const view_employees = async () => {
    const results = await db.getEmployees();
    console.table(results);
    doMenuQuestions();
};

const add_department = async () => {
    const response = await inquirer.prompt(addDepartmentQuestions);
    const results = await db.addDepartment(response);
    console.log('\n', results, '\n');
    doMenuQuestions();
};

const add_role = async () => {
    const results = await db.getDepartments();
    const departmentQuestion = addRoleQuestions[2];
    results.forEach((department) => {
        departmentQuestion.choices.push({
            value: department.id,
            name: department.name,
        });
    });

    const response = await inquirer.prompt(addRoleQuestions);
    const roleResults = await db.addRole(response);
    console.log('\n', roleResults, '\n');
    doMenuQuestions();
};

const add_employee = async () => {
    const [roleResults, employeeList] = await Promise.all([db.getRoles(), db.getEmployees()]);

    const roleQuestion = addEmployeeQuestions[2];
    roleResults.forEach((role) => {
        const role_summary = `${role.title} (${role.department_name}: ${role.salary})`;
        roleQuestion.choices.push({
            value: role.id,
            name: role_summary,
        });
    });

    const managerQuestion = addEmployeeQuestions[3];
    employeeList.forEach((employee) => {
        managerQuestion.choices.push({
            value: employee.id,
            name: employee.name,
        });
    });

    managerQuestion.choices.push({
        value: null,
        name: 'None',
    });

    const response = await inquirer.prompt(addEmployeeQuestions);
    const employeeResults = await db.addEmployee(response);
    console.log('\n', employeeResults, '\n');
    doMenuQuestions();
};



doMenuQuestions();
