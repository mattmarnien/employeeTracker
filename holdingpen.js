choice = actionChoices();
switch (choice.choice) {
    case 'View Employees':
        query.viewEmployees().then(err =>{
            if(err) throw err;
            whatDo()}
            );                 
        break;

    case 'Add Employee':
        query.addEmployee().then(err =>{
            if(err) throw err;
            whatDo()}
            );           
        break;


    case 'Remove Employee':
    //    query.removeEmployee().then(err =>{
    //         if(err) throw err;
    //         whatDo()}
    //         );           
    connection.query('SELECT * FROM employee', async (err, data) => {
        if(err) throw err;
        empObj = data;
        empArr = [];
        for (let i = 0; i < empObj.length; i++) {
            let newStr = '';
            newStr = empObj[i].firstName + " " + empObj[i].lastName;
            empArr.push(newStr);
        }
        inq.prompt([
            {
                type: "list",
                message: "Which employee do you want to remove?",
                name: "remove",
                choices: empArr
            },
            {
                type: "confirm",
                message: `Are you sure?`,
                name: "confirm"

            }
        ]).then((err, remove) => {
            if (err) throw err;
            if (remove.confirm) {
                let removalArr = remove.remove.split(" ");
                connection.query(`Delete FROM employee WHERE firstName ="${removalArr[0]} AND lastName ="${removalArr[1]}";`, (err) => {
                    if (err) throw err;
                    console.log(`${remove.Remove} has been removed from the database.`);

                })
            }
        })



    }
    )
        break;

    case 'Exit':
        connection.end();
        return;


    // default:
    //     connection.end();
    //     break;
}

connection.end();
return;


const actionChoices =
     [{
            type: 'list',
            message: "What would you like to do?",
            name: "choice",
            choices: ["View Employees", "Add Employee", "Remove Employee", "View Department", "Add Department", "View Roles", "Add Roles", "Update Employee Roles", "Exit"]
        }];

const addQuestions = [{
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"   
    }];

 async function whatDo() {
    let choice = inq.prompt(actionChoices);

    switch (choice) {

        case 'AddEmployee':
            inq.prompt(addQuestions).then((err,answers) =>{
                if(err) throw err;
                addEmployees(answers);
            });
            break;
            

    }

    inq.prompt([
        {
            type: "confirm",
            message: "Any more actions?",
            name: "confirm"
        }
    ]).then((err, res) => {
        if (err) throw err;
        if(res){
            whatDo();
        }
        else{
            return;
        }
    })

 }
   

   





init();
















