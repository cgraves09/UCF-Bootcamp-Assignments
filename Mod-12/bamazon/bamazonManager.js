let inquirer = require('inquirer');
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Paradox231!',
    database: 'bamazonDB'
});

connection.connect(function(err){
    if (err) throw err;
    start();
});

function start(){
    connection.query('SELECT * FROM products', function(err,res){
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to do?',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
            }
        ]).then(function(answers){
            let choice = answers.choices
            switch (choice) {
                case 'View Products for Sale':
                return viewProducts(res);
                case 'View Low Inventory':
                return lowInventory(res);
                case 'Add to Inventory':
                return addInventory(res);
                case 'Add New Product':
                return newProduct(res);

            }
        })
    })
};

function viewProducts(res){
    for (let i = 0; i < res.length; i++){
        console.log(res[i]);
    };

    start();
}

