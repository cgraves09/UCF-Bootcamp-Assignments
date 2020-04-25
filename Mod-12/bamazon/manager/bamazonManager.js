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
                return addInventory();
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
};

function lowInventory(res){
    for (let i = 0; i < res.length; i++){
        if (res[i].inventory <= 5){
            console.log(res[i]);
        }
        if (i = res.length){
            console.log('No low inventory reported.')
        }
    };
    start();
};

function addInventory(){
    connection.query('SELECT * FROM products', function(err,res){
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'products',
                message: 'What item would you like to add inventory to?',
                choices: function(){
                    let choicesArray = [];
                    for (let i = 0; i < res.length; i++){
                        choicesArray.push(res[i].product)
                    }
                    return choicesArray
                }
            },
            {
                type: 'number',
                name: 'inventory',
                message: 'How many items would you like to add to the inventory?'
            }
        ]).then(function(answers){
            let chosenItem;
            for (let i = 0; i < res.length; i++){
                if (res[i].product === answers.products){
                    chosenItem = res[i]
                }
            }
            connection.query('UPDATE products SET ? WHERE ?',
            [
                {
                    inventory: chosenItem.inventory +answers.inventory
                },
                {
                    product: answers.products
                }
            ])
            console.log('\n Item sucessfully updated! \n')
            start();
        })
    })   
}

function newProduct(res){
    inquirer.prompt([
        {
            type: 'input',
            name: 'product',
            message: 'What is the name of the item you wish to add?'
        },
        {
            type: 'number',
            name: 'price',
            message: 'What is the price of the item?'
        },
        {
            type: 'number',
            name: 'inventory',
            message: 'What is the inventory of this item?'
        }
    ]).then(function(answers){
        connection.query('INSERT INTO products SET ?',
        {
            product: answers.product,
            price: answers.price,
            inventory: answers.inventory
        },function(err){
            if (err) throw err;
            console.log('\nProduct successfully added\n');
            })
        start();
        })
}

