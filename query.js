var mysql = require("mysql");
var inq = require('inquirer');
require('console.table');


const connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "AlineWeasel62!",
    database: "company_db"
});



function viewDepartments() {

    let deparmentArray = connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        return (res);
    })
    console.table(deparmentArray);

    deparmentArray.map(x => console.log(x));

}

 function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        connection.end();
       console.table(data);
       
    }
    )


}
 async function addEmployee() {
    let newEmp = await inq.prompt([
        {
            type: "input",
            message: "What is the new employee's first name?",
            name: "firstname"
        },
        {
            type: "input",
            message: "What is the new employee's last name?",
            name: "lastname"
        },
        {
            type: "input",
            message: "What department will this employee work in?",
            name: "department"
        },


        {
            type: "input",
            message: "What is the new employee's role?",
            name: "role"
        }
    ])
    connection.query(`INSERT INTO employee(firstname, lastname, roleId, managerId) VALUES(${newEmp.firstname}, ${newEmp.lastname}, ${newEmp.role}, ${newEmp.manager}"`, (err, data) => {
        if (err) throw err;
        console.log(`${remove.toRemove} has been removed from the database.`)
    })
}




async function deleteEmployee() {
    let remove = await inq.prompt([
        {
            type: "input",
            message: "Which employee do you want to remove?",
            name: "toRemove"
        }
    ])
    connection.query(`Delete FROM employee WHERE name ="${remove.toRemove}"`, (err, data) => {
        if (err) throw err;
        console.log(`${remove.toRemove} has been removed from the database.`)
    })
}

module.exports = {
    viewEmployees: viewEmployees,
    viewDepartments: viewDepartments,
    deleteEmployee: deleteEmployee,
    addEmployee: addEmployee

}