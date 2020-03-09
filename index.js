// Imports
var mysql = require("mysql");
var inqurier = require('inquirer');







var connection = mysql.createConnection({
      host: "localhost",
    
      // Your port; if not 3306
      port: 3306,
    
      // Your username
      user: "root",
    
      // Your password
      password: "",
      database: "greatbay"
    });
    // var tableToSearch = 'songs'
    // var desiredField = 'genre'
    // var fieldMatch = 'Pop'
    // var searchFor = `FROM ${tableToSearch} WHERE ${desiredField} = '${fieldMatch}'`
    const inquirer = require("inquirer");
    ​
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to POST or BID?",
            choice: ["POST", "BID", "EXIT"],
            title: "auction"
        },
    ]).then(
        function (answers) {
            if (answers.auction === "POST") {
                postQuestions();
            } else if (answers.auction === "BID") {
                bidQuestions();
            } else {
                break;
            }
        }
    )
    ​
    function postQuestions() {
        inquirer.prompt([
            {
                type: "input",
                message: "What would you like to post?",
                title: "item"
            },
            {
                type: "input",
                message: "In what category would you like to place your action?",
                title: "category"
            },
            {
                type: "input",
                message: "What do you want your starting bid to be?",
                title: "startingBid"
            }
        ]).then(
        
        )
    }
    ​
    function bidQuestions() {
        getItems()
        inquirer.prompt([
            {
                type: "input",
                message: "What do you want to bid on(please enter ID)?",
                title: "bidItem"
            },
            {
                type: "input",
                message: "How much do you want to bid?",
                title: "bidAmount"
            }
        ]).then(
           
    ​
        )
    }
    Collapse
    
    
    
    
    
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
      });
    
      function getItems() {
        connection.query("SELECT * FROM items", function(err, res){
            if(err) throw err;
            for(let i = 0; i < res.length; i++){
            console.log(res[i])
            }
          })
        }
      
    