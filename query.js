// var mysql = require("mysql");
// var inq = require('inquirer');
// require('console.table');


// const connection = mysql.createConnection({
//     port: 3306,
//     host: "localhost",
//     user: "root",
//     password: "AlineWeasel62!",
//     database: "company_db"
// });



// // function viewDepartments() {

// //     connection.query("SELECT * FROM department", function (err, res) {
// //         if (err) throw err;
// //         console.table(res);
// //     })



// // }

// async function viewEmployees() {
//     connection.query('SELECT * FROM employee', (err, data) => {
//         if (err) throw err;
//         console.table(data);
//         return;
//     }
//     )
// }
// function addEmployee() {
//     inq.prompt([
//         {
//             type: "input",
//             message: "What is the new employee's first name?",
//             name: "firstname"
//         },
//         {
//             type: "input",
//             message: "What is the new employee's last name?",
//             name: "lastname"
//         }
//     ]).then( (err, newEmp) => {
//         if(err) throw err;
//         connection.query(`INSERT INTO employee(firstname, lastname) VALUES("${newEmp.firstname}", "${newEmp.lastname}")`, async (err, data) => {
//             if (err) throw err;
    
//             console.log(`\n \n ${newEmp.firstname} ${newEmp.lastname} has been added into the database. \n \n`)
//         });
//     });
    

// }




// function removeEmployee() {
//     connection.query('SELECT * FROM employee', async (err, data) => {
//         if(err) throw err;
//         empObj = data;
//         empArr = [];
//         for (let i = 0; i < empObj.length; i++) {
//             let newStr = '';
//             newStr = empObj[i].firstName + " " + empObj[i].lastName;
//             empArr.push(newStr);
//         }
//         inq.prompt([
//             {
//                 type: "list",
//                 message: "Which employee do you want to remove?",
//                 name: "remove",
//                 choices: empArr
//             },
//             {
//                 type: "confirm",
//                 message: `Are you sure?`,
//                 name: "confirm"

//             }
//         ]).then((err, remove) => {
//             if (remove.confirm) {
//                 let removalArr = remove.remove.split(" ");
//                 connection.query(`Delete FROM employee WHERE firstName ="${removalArr[0]} AND lastName ="${removalArr[1]}";`, (err) => {
//                     if (err) throw err;
//                     console.log(`${remove.Remove} has been removed from the database.`);

//                 })
//             }
//         })



//     }
//     )
// }



// module.exports = {
//     viewEmployees: viewEmployees,
//     // viewDepartments: viewDepartments,
//     removeEmployee: removeEmployee,
//     addEmployee: addEmployee

// }