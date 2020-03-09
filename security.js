// Modules
var inquirer = require('inquirer');
var mysql = require("mysql");
require('dotenv').config()
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "AlineWeasel62!",
    database: "company_db"

});
async function verifyUser(){
    let login = false;
    let user = await inquirer.prompt([
    {
        type: "input",
        message: "Enter your username:",
        name: "username",
        validate: input => {
            if (input.trim() === '') {
                console.log("Please enter a use name");
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
                console.log("Please enter a use name");
                return false;
            }
            return true;
        }
    }
])

console.log(user)

 connection.query("SELECT * FROM security;", (err, allowedUsers)=> {
    if(err) throw err; 
    for (let i = 0; i < allowedUsers.length; i++) {
       
        if (user.username === allowedUsers[i].username && user.password === allowedUsers[i].password) {
            console.log("Login Successful");
            login = true;            
            return;
        }}
           connection.end();
            console.log("Login Failed. Terminating Connection.")
            return;
    })

    return login;

}

    













// Exporting
module.exports = verifyUser; 