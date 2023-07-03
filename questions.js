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


//The code imports the inquirer module.
//mainMenuQuestions is an array of objects representing the questions to be presented in the main menu. 
//Each object has properties such as type (the type of the question), name (the name to identify the user's answer), message (the question text), and choices (the available options for the user). 
//The options are defined using an array of objects with value and name properties.
//addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, and updateEmployeeRoleQuestions are arrays of objects representing the questions for adding a department, adding a role, adding an employee, and updating an employee's role, respectively. 
//These question arrays follow a similar structure as mainMenuQuestions but with different properties based on the specific information needed.
//Finally, all the question arrays are exported as modules using module.exports so that they can be imported and used in other files.
//In summary, this code defines sets of questions for different operations in an employee management system, such as viewing departments, roles, and employees, adding departments, roles, and employees, and updating an employee's role.
//These questions can be used in conjunction with the inquirer module to prompt the user for input and gather information for further processing.