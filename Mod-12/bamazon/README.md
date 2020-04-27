# Bamazon
Version 1.0.0

## App Rundown
### BamazonCustomer is an CLI App that is interactive for the customer to purchase set items in the mysql database. 

### BamazonManager is a CLI App performing database management using node.js and mysql database. 

- Using inquirer npm the user will be able to preform CRUD operations to manipulate the mysql database.

The app is run by passing in user arguments from the terminal/command prompt, depending on the users request the program will execute one of functions based on a conditional outline. 

## Packages, Node, Mysql Workbench
In order to run the bamazon you need to create your own mysql database using the same column names and refrence the same port, database name and password that was set up in the mysql workbench.
You will also need to install the following npm packages:
- inquirer
- mysql

## Running the App
- Confirm that the packages have been installed into the correct folder this can be viewed in the package.json.
- Opening up the terminal/command prompt cd into the correct folder of the app.
- run $ node bamazon.js and follow the prompts:


## Screen Shots of working CLI APP
![alt text](bamazon/screenShots/bamazonCustomer.png)
![alt text](bamazon/screenShots/bamazonDatabase.png)
![alt text](bamazon/screenShots/bamazonManager.png)
![alt text](bamazon/screenShots/bamazonManager1.png)
