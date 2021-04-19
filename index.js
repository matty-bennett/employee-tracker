const mysql = require ('mysql2');
const inquirer = require('inquirer');
//const Choices = require('inquirer/lib/objects/choices');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '5Soccer8cr7',
        database: 'employeedb'
    },
    console.log('Connected to the election database.')
);

db.connect(function (err) {
	if (err) throw err;
});

let promptUser = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Select from the following options:',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
                /* [
                    {
                        'View all departments'
                    },
                    {
                        'View all roles'
                    },
                    {
                        'View all employees'
                    },
                    {
                        'add a department'
                    },
                    {
                        'add a role'
                    },
                    {
                        'add an employee'
                    },
                    {
                        'update an employee role'
                    } 
                ] */
            }
        ])
        .then(answers => {
            if (answers === 'View all departments') {
                console.log(answers);
            } else if (answers === 'View all roles') {
                console.log(answers);
            } else if (answers === 'View all employees') {
                console.log(answers);
            } else if (answers === 'Add a department') {
                console.log(answers);
            } else if (answers === 'Add a role') {
                console.log(answers);
            } else if (answers === 'Add an employee') {
                console.log(answers);
            } else (answers === 'Update an employee role')
                console.log(answers);
        })
};
promptUser();