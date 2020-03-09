// Imports
var mysql = require("mysql");
var inquirer = require('inquirer');
var verifyUser = require('./security.js')
var query = require('./query.js');

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

async function whatDo() {
    let choice = await inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: "choice",
            choices: ["View Employees", "Add Employee", "View Department", "Add Department", "View Roles", "Add Roles", "Update Employee Roles"]
        }

    ]);
    switch (choice) {
        case 'View Employees':
            query.viewEmployee();

        case 'Add Employees':
            addEmployee();


        case 'Remove Employee':
            removeEmployee();


        case 'View Department':
            showDepartment();


        case 'Add Department':
            addDepartment();

        case 'Remove Department':
            removeDepartment();


        case 'View Roles':
            viewRoles();


        case 'Add Roles':
            addRoles();


        case 'Remove Roles':
            removeRoles();


        case 'Update Employee Roles':
            changeEmployeeRoles();

        default:
    };
}

connection.connect(async function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
    login = await verifyUser();
    console.log(login);
    if(login){
       await whatDo();
    }
    else{
        connection.end();
    }

                
            
  

        
})



