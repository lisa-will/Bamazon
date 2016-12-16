"use strict";

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

var ourTable = new Table();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "MySQLpass!**",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("I am connected");
});

// Query Database
function queryDatabase(query, whereClause)
{

    //console.log(query);

     connection.query(query, whereClause, function(err, res){
         if(err){
             throw err;
         }

         //console.log(res);
         displayResult(res);
       
         
    });
}

var displayResult = function(results){
    for(var i = 0; i < results.length; i++){
        var record = results[i];
        ourTable.cell("Product ID: ", record.item_id);
        ourTable.cell("Product Name: ", record.product_name);
        // ourTable.cell("Department: ", record.department_name);
        ourTable.cell("Price (USD): ", record.price, Table.number(2));
        // ourTable.cell("Qty: ", record.stock_quantity);
        ourTable.newRow();
    }
    console.log(ourTable.toString())
};

var department = "";
var whereClause = {
    //department_name: department
};

var query = "SELECT * FROM product";

queryDatabase(query, whereClause);

connection.end();

