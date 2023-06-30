const inquirer = require('inquirer');

const mainMenuQuestions = [
  {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
          { value: 'view_departments', name: "view all departments" },
          { value: 'view_roles', name: "view all roles" },
          { value: 'view_employees', name: "view all employees" },
          { value: 'add_department', name: "add a department" },
          { value: 'add_role', name: "add a role" },
          { value: 'add_employee', name: "add an employee" },
          { value: 'update_role', name: "update an employee role" },
      ],
  },
]

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

const updateEmployeeRoleQuestions = [
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee to update...',
      choices: [],
    },
    {
      type: 'list',
      name: 'role_id',
      message: "Select the employee's new role...",
      choices: [],
    },
  ];
  
  module.exports = { mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions };