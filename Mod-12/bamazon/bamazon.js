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
                type: 'rawlist',
                name: 'items',
                message: 'What would you like to buy?',
                choices: function(){
                    let choicesArray = [];
                    for (let i = 0; i < res.length; i++){
                        choicesArray.push(res[i].item_name)
                    }
                    return choicesArray;
                }
            },
            {
                type: 'number',
                name: 'quantity',
                message: 'How many units would you like to purchase?'

            }
        ]).then(function(answers){
            let chosenItem;
            for(let i = 0; i < res.length; i++){
                if (res[i].item_name === answers.items){
                    chosenItem = res[i];
                }
            }
            
            if (chosenItem.inventory > 0) {
                connection.query('UPDATE products SET ? WHERE ?',
                [
                    {
                        inventory: chosenItem.inventory -answers.quantity
                    },
                    {
                        id: chosenItem.id
                    }
                ],
                function(err){
                    if (err) throw err;
                    console.log('\nCongrats your order has completed!');
                    console.log('\nItem: ' + chosenItem.item_name + '\n Price: ' + "$" + chosenItem.price + '\n');
                    start();
                });
            }
            else {
                console.log('Insufficient quantity!');
                start();
            }
        })
    })
}