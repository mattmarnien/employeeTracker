// Imports
var mysql = require("mysql");
var inq = require('inquirer');
// var query = require('./query.js');
let login = false;
const cTable = require('console.table');

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "AlineWeasel62!",
    database: "company_db"

});

connection.connect(async err =>{
    if(err) throw err;
    console.log("Connected as " +connection.threadId);
})

// async function verify() {
//     let users = connection.query("SELECT * FROM security;", (err, res) => {
//     if(err)throw err;
//     return res}
//     )
//     return users;
// }


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
    connection.connect(async function (err) {
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
                connection.end();
            }
            else {
                console.log("Login failed. Please try again \n \n");
                connection.end();

            }
        })
    })
});
}

// init();

async function addEmployee(){
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
    connection.query(`INSERT INTO employee(firstName, lastName) VALUES("${newEmp.firstname}", "${newEmp.lastname}")`, (err,data) =>{
        if(err) throw err;
        console.log("Employee Added");
    })

    
}

async function viewEmployees(){
    console.log("\n\n\n");
    connection.query("SELECT * FROM employee", (err, data) =>{
        if(err) throw err;
        console.table(data);

    })

}

viewEmployees();