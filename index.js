// Imports
var mysql = require("mysql");
var inquirer = require('inquirer');
var verifyUser = require('./security.js')

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
            showAllEmployees();

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

    function showAllEmployees() {
        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            console.log(res);
        })
    }


async function showDepartment(){

    let deparmentArray = connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        return(res);
    })
    console.log(deparmentArray);

    let departmentChoice = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which department would you like to view?',
            name: 'choice',
            list: departmentArray
        }
        ]);
        for(let i = 0; i < departmentArray.length; i++){
            if(departmentChoice === departmentArray[i].name){
                console.log(departmentArray.name + departmentArray.STUFFHERE)
            }
        }
}




    var connection = mysql.createConnection({
        port: 3306,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "company_db"

    });
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
    });

    function newQuery() {
        verifyUser();


    }
