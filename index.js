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
    const response = await inquirer.prompt(MainMenuQuestions);
    const selectedOption = response.option;
    const selectedFunction = menuOptions[selectedOption];
    if (selectedFunction) {
        selectedFunction();
    }
};

doMenuQuestions();
