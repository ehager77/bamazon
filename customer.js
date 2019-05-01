var inquirer = require('inquirer');
var mysql = require('mysql');
var chalk = require('chalk');
var clear = require('clear')
var figlet = require('figlet');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'password',
    database: 'bamazon'
});

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInt(value) {
    var integer = Number.isInteger(parseFloat(value));

    if (integer) {
        return true;
    } else {
        return 'Please enter a number.';
    }
}

// Prompt the user for the item & quantity they want to purchase
function promptUser() {


    // Prompt the user to select an department
    inquirer.prompt([
        {
            type: 'list',
            validate: validateInt,
            name: 'option',
            message: 'Please select a Department:',
            choices: ['Grocery', 'Produce', 'Cosmetics', 'Clothing', "Pet", "Children", "Pharmacy", "Sports"],
            filter: function (val) {
                if (val === 'Grocery') {
                    return 'grocery';
                } else if (val === 'Produce') {
                    return 'produce';
                } else if (val === 'Cosmetics') {
                    return 'cosmetics';
                } else if (val === 'Clothing') {
                    return 'clothing';
                }
                else if (val === 'Pet') {
                    return 'pet';
                }
                else if (val === 'Children') {
                    return 'children';
                }
                else if (val === 'Pharmacy') {
                    return 'pharmacy';
                }
                else if (val === 'Sports') {
                    return 'sports';
                }
                else {
                    // This case should be unreachable
                    console.log('ERROR: Unsupported operation!');
                    exit(1);
                }
            }
        }
    ]).then(function (input) {

            // Construct the db query string
            QueryString = 'select * from products where department_name="' + input.option + '"';
            console.log(QueryString);

            // Make the db query
            connection.query(QueryString, function (err, data) {
                if (err) throw err;

                console.log('Items in stock: ');
                console.log('...................\n');

                var strOut = '';
                for (var i = 0; i < data.length; i++) {
                    strOut = '';
                    strOut += 'Item ID: ' + data[i].item_id + '  //  ';
                    strOut += 'Product Name: ' + data[i].product_name + '  //  ';
                    strOut += 'Quantity: ' + data[i].stock_quantity + ' // '
                    strOut += 'Price: $' + data[i].price + '  \n  ';

                    console.log(strOut);
                }

                // console.log("---------------------------------------------------------------------\n");
                // Prompt the user to select an item
                inquirer.prompt([
                    {
                        type: 'input',
                        validate: validateInt,
                        name: 'item_id',
                        message: 'Please enter the item id for the product that you would like to purchase.',
                        filter: Number
                    },
                    {
                        type: 'input',
                        validate: validateInt,
                        name: 'quantity',
                        message: 'How many do you need?',
                        filter: Number
                    }
                ]).then(function (input) {

                    var item = input.item_id;
                    var quantity = input.quantity;

                    // Query to confirm that the given item ID exists in the desired quantity
                    var queryString = 'SELECT * FROM products WHERE ?';

                    connection.query(queryString, { item_id: item }, function (err, data) {
                        if (err) throw err;

                        // If the user has selected an invalid item ID, data attay will be empty
                        // console.log('data = ' + JSON.stringify(data));

                        if (data.length === 0) {
                            console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                            displayInventory();

                        } else {
                            var productData = data[0];

                            // console.log('productData = ' + JSON.stringify(productData));
                            // console.log('productData.stock_quantity = ' + productData.stock_quantity);

                            // If the quantity requested by the user is in stock
                            if (quantity <= productData.stock_quantity) {
                                console.log('Congratulations, the product you requested is in stock! Placing order!');

                                // Construct the updating query string
                                var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                                // console.log('updateQueryString = ' + updateQueryString);

                                // Update the inventory
                                connection.query(updateQueryString, function (err, data) {
                                    if (err) throw err;

                                    console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                                    console.log('Thank you for shopping with us!');
                                    console.log("\n---------------------------------------------------------------------\n");

                                    // End the database connection
                                    connection.end();
                                })
                            } else {
                                console.log('Sorry, there is not enough product in stock.');
                                console.log('Please modify your order.');
                                console.log("\n---------------------------------------------------------------------\n");

                                promptUser();
                            }
                        }
                    })
                })
            })
        })

    }



// Execute the main application logic
function bam() {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('Bam!azon', { horizontalLayout: 'full' })
        )
    );
    // Display the available inventory
    promptUser();
}

//BAM!!
bam();