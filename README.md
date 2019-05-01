# bamazon

## Description

This is a command line applcation that allows customers to view a shop's inventory based on category.  The app also allows administrators to update and view inventory based on filters such as quantity and deparotmetn name.

## Database Setup

In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the MySQL installation page to install the version you need for your operating system. Once you have MySQL isntalled, you will be able to create the Bamazon database and the products table with the SQL code found in bamazon.sql. Run this code inside your MySQL client like Sequel Pro to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

## Customer Interface
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run:

`git clone git@github.com:angrbrd/bamazon.git` 
`cd bamazon` 
`npm install`
`node customer.js`

Watch demo here:

![alt text] (https://media.giphy.com/media/XbPRxJLx36pAuneXZ4/giphy.gif)

## Manager Interface

The manager interface presents a list of four options, as below.

The View Products for Sale option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price, and the quantity available in stock.

The View Low Inventory option shows the user the items which currently have fewer than 100 units available.

The Add to Inventory option allows the user to select a given item ID and add additional inventory to the target item.

The Add New Product option allows the user to enter details about a new product which will be entered into the database upon completion of the form.

To run:

`node admin.js`

Watch demo: 

![alt text] (https://media.giphy.com/media/SvcCTVM07xuO4GExmy/giphy.gif)


