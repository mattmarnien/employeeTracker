// Imports
var mysql = require("mysql");
var inquirer = require('inquirer');
var query = require('./query.js');
let login = false;

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "AlineWeasel62!",
    database: "company_db"

});

// async function verify() {
//     let users = connection.query("SELECT * FROM security;", (err, res) => {
//     if(err)throw err;
//     return res}
//     )
//     return users;
// }


async function init() {
    let user = await inquirer.prompt([
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
    ])

    connection.connect(async function (err) {
        if (err) throw err;
        connection.query("SELECT * FROM security;", async function (err, data) {
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
                whatDo();
            }
            else {
                console.log("Login failed. Please try again \n \n");
                connection.end();
                return;
            }
        })
    })
}

async function whatDo() {
    let choice = await inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: "choice",
            choices: ["View Employees", "Add Employee", "View Department", "Add Department", "View Roles", "Add Roles", "Update Employee Roles", "Exit"]
        }

    ]);
    switch (choice.choice) {
        case 'View Employees':
            query.viewEmployees();
            whatDo();
            break;

        // case 'Add Employees':
        //     addEmployee();


        // case 'Remove Employee':
        //     removeEmployee();


        // case 'View Department':
        //     showDepartment();


        // case 'Add Department':
        //     addDepartment();

        // case 'Remove Department':
        //     removeDepartment();


        // case 'View Roles':
        //     viewRoles();


        // case 'Add Roles':
        //     addRoles();


        // case 'Remove Roles':
        //     removeRoles();


        // case 'Update Employee Roles':
        //     changeEmployeeRoles();

        case 'Exit':
            connection.end();
            break;

        // default:
    };

}

init();
















