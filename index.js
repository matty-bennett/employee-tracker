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

db.connect();

let promptUser = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Select from the following options:',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
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
                    db.query(
                        `SELECT first_name, last_name, id FROM employees`,
                        function (err, results) {
                            if (err) {
                                console.log(err);
                            }
                            updateEmployeeRole(results);
                        }
                    )
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
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the role title?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department id:'
            }
        ])
        .then(newRole => {
            // add newRoles to role's table
            db.query(
                `INSERT INTO roles SET ?`, { title: newRole.title, salary: newRole.salary, department_id: newRole.department_id },
                function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    db.query(
                        `SELECT * FROM roles ORDER BY id ASC`,
                        function (err, results) {
                            console.table(results);
                            promptUser();
                        }
                    );
                }

            );
    })
};

addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter employee first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter employee last name:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter role id number: '
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter manager id (if applicable):'
            }
        ]).then(newEmployee => {
            // add newEmployee to employee's table
            db.query(
                `INSERT INTO employees SET ?`, { first_name: newEmployee.first_name, last_name: newEmployee.last_name, role_id: newEmployee.role_id, manager_id: newEmployee.manager_id },
                function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    db.query(
                        `SELECT * FROM employees ORDER BY id ASC`,
                        function (err, results) {
                            console.table(results);
                            promptUser();
                        }
                    );
                }
            );
    });
};

function updateEmployeeRole(employees) {
    //inquirer prompt asking which employee to update
    const employeeNames = employees.map((employee) => {
        return employee.first_name + ' ' + employee.last_name;
    })
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select the employee you would like to update:',
            choices: employeeNames
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the manager to assign to the selected employee:',
            choices: employeeNames
        }
    ]).then(({ employee, manager }) => {
        console.log(employee, manager);
        //somehow update employee with new manager in employees table
        const selectedEmployee = employees.find(e => employee === e.first_name + ' ' + e.last_name);
        const selectedManager = employees.find(m => manager === m.first_name + ' ' + m.last_name);

        db.query(
            `UPDATE employees SET manager_id = ? WHERE id = ?`,
            [selectedManager.id, selectedEmployee.id],
            function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log('Done');
                promptUser();
            }
        )
    })
}

// updateEmployeeRole = () => {
//     inquirer
//         .prompt([
//             {
//                 type: 'input',
//                 name: 'first',
//                 message: 'Enter employee first name',
//             },
//             {
//                 type: 'input',
//                 name: 'last',
//                 message: 'Enter employee last name',
//             },
//             {
//                 type: 'input',
//                 name: 'newrole',
//                 message: 'Enter new role id number',
//             },

//         ])
//         .then(answer => {
//             const sql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
//             const params = [answer.newrole, answer.first, answer.last];
//             db.query(sql, params, (err, rest) => {
//                 console.log(`${answer.first} ${answer.last}'s role has been updated`);
//             })
//             db.query(`SELECT * FROM employee`, (err, employees) => {
//                 console.table(employees)
//                 promptUser();
//             })
//         });
// };