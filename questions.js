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
  
  module.exports = {
    promptMainMenu: async () => {
      const answers = await inquirer.prompt(mainMenuQuestions);
      return answers.option;
    },
  
    promptAddDepartment: async () => {
      const answers = await inquirer.prompt(addDepartmentQuestions);
      return answers.department_name;
    },
  
    promptAddRole: async (departments) => {
      const roleQuestions = JSON.parse(JSON.stringify(addRoleQuestions));
      roleQuestions[2].choices = departments;
      const answers = await inquirer.prompt(roleQuestions);
      return answers;
    },
  
    promptAddEmployee: async (roles, employees) => {
      const employeeQuestions = JSON.parse(JSON.stringify(addEmployeeQuestions));
      employeeQuestions[2].choices = roles;
      employeeQuestions[3].choices = employees;
      const answers = await inquirer.prompt(employeeQuestions);
      return answers;
    },
  
    promptUpdateEmployeeRole: async (employees, roles) => {
      const updateQuestions = JSON.parse(JSON.stringify(updateEmployeeRoleQuestions));
      updateQuestions[0].choices = employees;
      updateQuestions[1].choices = roles;
      const answers = await inquirer.prompt(updateQuestions);
      return answers;
    },
  };