// Imports
var mysql = require("mysql");
var inq = require('inquirer');
const cTable = require('console.table');
require('dotenv').config()


let login = false;

const connection = mysql.createConnection({
    port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "company_db"

});

// initialized DB connection and checks user credentials
function init() {
    inq.prompt([
        {
            type: "input",
            message: "Enter your username:",
            name: "username",
            validate: input => {
                if (input.trim() === '') {
                    console.log("Please enter a user name");
                    return false;
                }
                return true;
            }
        },
        {
            type: "input",
            message: "Enter your password:",
            name: "password",
            validate: input => {
                if (input.trim() === '') {
                    console.log("Please enter a password");
                    return false;
                }
                return true;
            }
        }
    ]).then(user => {
        connection.connect(function (err) {
            if (err) throw err;
            connection.query("SELECT * FROM security;", function (err, data) {
                if (err) throw err;
                data.forEach(element => {
                    if (element.username === user.username && element.password === user.password) {
                        login = true;
                        return;
                    }
                });
                console.log(login);
                if (login) {
                    console.log("Login Successful \n \n");
                    whatToDo();
                }
                else {
                    console.log("Login failed. Please try again \n \n");
                    connection.end();

                }
            })
        })
    }).catch(err => {
        if (err) throw err;
    })
        ;
}

// adds a new employee to the employee table
async function addEmployee() {
    console.log("\n \n")
    let newEmp = await inq.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstname"

        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastname"
        }
    ]);
    connection.query(`INSERT INTO employee(firstName, lastName) VALUES("${newEmp.firstname}", "${newEmp.lastname}")`, (err, data) => {
        if (err) throw err;
        console.log("Employee Added");
    })
    whatToDo();
}

// displays all current employees
async function viewEmployees() {
    console.log("\n\n\n");
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table("\n \n" + data + "\n\n");
        whatToDo();

    })
   
}

// removes an employee
async function removeEmployee() {
    connection.query("SELECT * FROM employee", async (err, data) => {
        if (err) throw err;
        empArr = [];
        for (let i = 0; i < data.length; i++) {
            empArr.push(data[i].firstName + " " + data[i].lastName)
        }
        let removed = await inq.prompt([
            {
                type: "list",
                message: "Which employee would you like to remove?",
                name: "choice",
                choices: empArr
            }
        ])
        let removedArr = await removed.choice.split(" ");
        console.log(removedArr);
        connection.query(`DELETE FROM employee where firstName = "${removedArr[0]}" AND lastName = "${removedArr[1]}"`, err => {
            if (err) throw err;
            console.log("Employee Removed.");
            whatToDo();
        })
    })
    
}

// displays employee by department
async function viewEmployeebyDepartment() {
    connection.query("SELECT * FROM department", async (err, data) => {
        if (err) throw err;
        let depArr = [];
        for (let i = 0; i < data.length; i++) {
            depArr.push(data[i].name);
        }
        let chosen = await inq.prompt([
            {
                type: "list",
                message: "Which department would you like to view?",
                name: "departmentChoice",
                choices: depArr
            }
        ]);
        let chosenId = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === chosen.departmentChoice) {
                chosenId = data[i].id;
            }
        }
        connection.query(`SELECT employee.firstName, employee.lastName, role.title, department.name FROM Employee JOIN role ON employee.roleId = role.id JOIN department ON role.department_id = department.id WHERE department_id = 1 = ${chosenId}`, (err, data) => {
            if (err) throw err;
            console.table(data);
            whatToDo();
        })
    })
}

// views existing departments
async function viewDepartments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data);
        whatToDo();
    })
    
}

// adds a new department
async function addDepartment() {
    let newDep = await inq.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "newDepartment"
        }
    ])
    connection.query(`INSERT INTO department(name) VALUES("${newDep.newDepartment}")`, (err) => {
        if (err) throw err;
        console.log("New department added.");
        whatToDo();
    })
   
}

// removes a department
async function removeDepartment() {
    connection.query("SELECT * FROM department", async (err, data) => {
        if (err) throw err;
        let depArr = [];
        for (let i = 0; i < data.length; i++) {
            depArr.push(data[i].name);
        }
        let depToRemove = await inq.prompt([
            {
                type: "list",
                message: "Which department would you like to remove?",
                name: "choice",
                choices: depArr
            }
        ])
        connection.query(`DELETE FROM department WHERE name = "${depToRemove.choice}"`, err => {
            if (err) throw err;
            console.log("Department Deleted")
            whatToDo();
        })
    })
    
}

// displays all roles
async function viewRoles() {
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        whatToDo();
    })
   
}

// adds a new role
async function addRole() {
    connection.query("SELECT * FROM department", async (err, data) => {
        if (err) throw err;
        let depArr = [];
        for (let i = 0; i < data.length; i++) {
            depArr.push(data[i].name);
        }
        let newRole = await inq.prompt([
            {
                type: "input",
                message: "What role would you like to add?",
                name: "newRole"
            },
            {
                type: "input",
                message: "What is this role's salary?",
                name: "salary"

            },
            {
                type: "list",
                message: "What department will this role work in?",
                name: "department",
                choices: depArr
            }
        ]);
        let chosenId = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === newRole.department) {
                chosenId = data[i].id;
            }
        } connection.query(`INSERT INTO role(title, salary, department_id) VALUES("${newRole.newRole}", ${newRole.salary}, ${chosenId})`, err => {
            if (err) throw err;
            console.log("New role added.")
            whatToDo();
        })

    })
   
}

// deletes a role
async function removeRole() {
    connection.query("SELECT * FROM role", async (err, data) => {
        if (err) throw err;
        let roleArr = [];
        for (let i = 0; i < data.length; i++) {
            roleArr.push(data[i].title)
        }
        let roleToRemove = await inq.prompt([
            {
                type: "list",
                message: "What role would you like to remove?",
                name: "role",
                choices: roleArr
            }
        ]);
        connection.query(`DELETE FROM role WHERE title = "${roleToRemove.role}"`, err => {
            if (err) throw err;
            console.log("Role removed.")
            whatToDo();
        })
    })
    
}

// updates a given employee's role
async function updateRole() {
    connection.query("SELECT * FROM employee", async (err, data) => {
        if (err) throw err;
        empArr = [];
        for (let i = 0; i < data.length; i++) {
            empArr.push(data[i].firstName + " " + data[i].lastName)
        }
        connection.query("SELECT * FROM role", async (err, data) => {
            if (err) throw err;
            let roleArr = [];
            let roleIdArr = [];
            for (let i = 0; i < data.length; i++) {
                roleArr.push(data[i].title)
                roleIdArr.push(data[i].id)
            }
            let toUpdate = await inq.prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    name: "choice",
                    choices: empArr
                },
                {
                    type: "list",
                    message: "What role would you like to give this employee?",
                    name: "newRole",
                    choices: roleArr
                }
            ])
            let newRoleId = '';
            for (let j = 0; j < roleArr.length; j++) {
                if (roleArr[j] === toUpdate.newRole) {
                    console.log("if triggered");
                    newRoleId = roleIdArr[j];
                    console.log(newRoleId);
                }
            }
            console.log(newRoleId);
            let toUpdateArr = await toUpdate.choice.split(" ");
            connection.query(`UPDATE employee SET roleId = ${newRoleId} WHERE firstName = "${toUpdateArr[0]}" AND lastName = "${toUpdateArr[1]}"`, err => {
                if (err) throw err;
                console.log("Employee Updated.");
                whatToDo();
            })
        })
    })
   
}

// should route the user into various functions, is nested in all other functions to return to selection menu after tasks
async function whatToDo() {
    let done = false;
    let choice = await inq.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "function",
            choices: ['Add Employee', 'View Employees', 'Remove Employee', 'View Employee by Department', 'View Departments', 'Add Department', 'Remove Department', 'View Roles', 'Add Role', 'Remove Role', "Update an Employee's Role", 'Exit']
        }
    ])
    switch (choice.function) {
        case 'Add Employee':
            addEmployee();
            break;
        case 'View Employee':
            viewEmployees();
            break;
        case 'Remove Employee':
            removeEmployee();
            break;
        case 'View Employee by Department':
            viewEmployeebyDepartment();
            break;
        case 'View Departments':
            viewDepartments();
            break;
        case 'Add Departments':
            addDepartment();
            break;
        case 'Remove Department':
            removeDepartment();
            break;
        case 'View Roles':
            viewRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Remove Role':
            removeRole();
            break;
        case "Update an Emplopyee's Role":
            updateRole();
            break;
        case 'Exit':
            connection.end();
            return;
    }
}

// Starts the program

init();




