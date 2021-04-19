const mysql = require ('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '5Soccer8cr7',
        database: 'employeedb'
    },
    console.log('Connected to the employeedb database.')
);

let promptUser = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Select from the following options:',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
            }
        ])
        .then(answers => {
            switch (answers.options) {
                case 'View all departments':
                    viewAllDepartments();
                    break;

                case 'View all roles':
                    viewAllRoles();
                    break;

                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update an employee role':
                    updateEmployeeRole();
                    break;

                default: process.exit();
            }
        });
};
promptUser();

viewAllDepartments = () => {
    db.query(
        `SELECT * FROM departments ORDER BY id ASC`,
        function (err, results) {
            console.table(results);
            promptUser();
        }
    )
};

viewAllRoles = () => {
    db.query(
        `SELECT * FROM roles ORDER by id ASC`,
        function(err, results) {
            console.table(results);
            promptUser();
        }
    )
};

viewAllEmployees = () => {
    db.query(
        `SELECT * FROM employees ORDER by id ASC`,
        function(err, results) {
            console.table(results);
            promptUser(); 
        }
    )
};

addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'Enter new department name:'
            }
        ])
        .then(newDepartment => {
            db.query(
                `INSERT INTO departments SET ?`, { dptname: newDepartment.addDepartment },
                function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    db.query(
                        `SELECT * FROM departments ORDER BY id ASC`,
                        function (err, results) {
                            console.table(results);
                            promptUser();
                        }
                    );
                }
            );
        })
};

addRole = () => {
    
};

addEmployee = () => {

};

//updateEmployeeRole = () => {

//};