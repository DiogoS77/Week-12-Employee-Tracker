const inquirer = require('inquirer');

const mainMenuQuestions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  },
];

const addDepartmentQuestions = [
  {
    type: 'input',
    name: 'department_name',
    message: 'Enter the name of the new department...',
  },
];

const addRoleQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of the new role...',
  },
  {
    type: 'number',
    name: 'salary',
    message: 'Enter the salary of the new role (must be numeric)...',
    validate: function (value) {
      const valid = !isNaN(parseInt(value));
      return valid || 'Please enter a number';
    },
  },
  {
    type: 'list',
    name: 'department_id',
    message: 'Select the department for the role...',
    choices: [],
  },
];

const addEmployeeQuestions = [
  {
    type: 'input',
    name: 'first_name',
    message: 'Enter the first name of the employee...',
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Enter the last name of the employee...',
  },
  {
    type: 'list',
    name: 'role_id',
    message: 'Select the role for the employee...',
    choices: [],
  },
  {
    type: 'list',
    name: 'manager_id',
    message: "Select the employee's manager...",
    choices: [],
  },
];