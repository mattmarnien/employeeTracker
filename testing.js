
var mysql = require("mysql");
var inquirer = require('inquirer');
var query = require('./query.js');
let login = false;
const util = require('util')

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "AlineWeasel62!",
    database: "company_db"

});

const queryAsync = util.promisify(connection.query);



connection.connect(function (err) {
      if(err) throw err;
      console.log ("Connected");

    })

    
async function getUsers(){
    try{let allowed = await queryAsync("SELECT * FROM security;")
    return allowed;
} catch (err){
    console.log(err);
}

}
let test = getUsers();
console.log(test);
connection.end();