// Modules
var inquirer = require('inquirer');
var mysql = require("mysql");
require('dotenv').config()

var connection = mysql.createConnection({
    port: 3306,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "company_db"
  });

  
// Function to get login info and check against security db
async function verifyUser() {

    //get user login info
    const user = await inquirer.prompt([
        {
            type: "input",
            message: "Enter your username:",
            name: "username",
            validate: input => {
                if(input.trim() === ''){
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
                if(input.trim() === ''){
                    console.log("Please enter a use name");
                    return false;
                }
                return true;
            }
        }

    ]);
    // gets list of users with access
    const allowedUsers = connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);   
        connection.query("SELECT * FROM security", function(err, res){
            if(err) throw err;
            return res;        
            })
          })

    console.log(user);
    console.log(allowedUsers);

    // checks login for a match in db, returns true if so
    for(let i = 0; i < allowedUsers.length; i++){
        if (user.username === allowedUsers[i].username && user.password === allowedUsers[i].password){
            console.log("Login Successful");
            return true;
        } 
    }
        
}















// Exporting
module.exports = verifyUser; 