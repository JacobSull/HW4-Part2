// Jacob Sullivan
// Jacob_sullivan@student.uml.edu
// 12/1/2022
// HW4
// script.js

// This file serves to build the functionality of creates the tables. There are two main operations, updateTable and submitTable. They both first validate that the inputs are what are expected,
// and then they create a new table based on those inputs. With updateTable, the current tab is found and the table is replaced with the new one. With submitTable, the current table is incremented
// and placed in a new tab

var tabNumber = 0;

function updateTable(form) {
    validateTable();
    if($("#commentForm").valid()) { 
        var table = createTable(form);
        var t = "tabs-" + tabNumber;    //gets the id number of the current tab
        document.getElementById(t).replaceChild(table, document.getElementById(t).firstChild); //replaces the table if one exists
        $("#tabs").tabs("refresh");
    }
}

function submitTable(form) {
    validateTable();
    if($("#commentForm").valid()) { 
        var table = createTable(form);
        tabNumber++;    //increments the tab number to one more
        var t = "tabs-" + tabNumber;   //gets the id number of the new tab
        //writes HTML in place to create the tab, with proper naming convention and a checkbox to delete it
        var li = "<li><a href=\"#tabs-" + tabNumber + "\">H[" + form.fhorz.value + " -> " + form.shorz.value + "] , V[" + form.fvert.value + " -> " + form.svert.value + "]</a><input type=\"checkbox\" name=\"cbox\" id=\"cbox-tabs-" + tabNumber + "\"></li>";
        var div = "<div id=\"tabs-" + tabNumber + "\"></div>";
        $("ul").append(li); //add nav to current navs
        $("#tabs").append(div); //add tab to current tabs
        document.getElementById(t).appendChild(table);
        $("#tabs").tabs("refresh");
    }
}

function validateTable() {
    jQuery.validator.addMethod("lessThan",  // Here, a new validation method is created, that checks if the Min value is less than the max value
            function (value, element, param) {
                var max = $(param);
                return parseInt(max.val()) > parseInt(value);
            }, "Minimum Value must be less than the Maximum.");
    jQuery.validator.addMethod("integer",   // Here, a new validation method is created, where the input is checked to be an integer and not a floating point value
            function (value, element, param) {
                var num = Number(value);
                return Number.isInteger(num);
            }, "Please enter an integer.");
    $("#commentForm").validate({
        rules: {    // rules for validation. There must be an inputted value, it must be a valid number that is an integer in between -50 and 50
            fhorz: {
                required: true,
                number: true,
                integer: true,
                range: [-50,50],
                lessThan: '#shorz'  // the first numbers must be less than the second
            },
            shorz: {
                required: true,
                number: true,
                integer: true,
                range: [-50,50]
            },
            fvert: {
                required: true,
                number: true,
                integer: true,
                range: [-50,50],
                lessThan: '#svert'
            },
            svert: {
                required: true,
                number: true,
                integer: true,
                range: [-50,50]
            }
        }
        // No messages were changed for this as the default messages well reflected the error as well as how to correct the error.
    });
}

function createTable(form) {
    var fhorz = Number(form.fhorz.value);   //converts the values to Numbers, this is because they will be strings initally
    var shorz = Number(form.shorz.value);
    var fvert = Number(form.fvert.value);
    var svert = Number(form.svert.value);
    var table = document.createElement("table"); //creates an HTML table 
    table.setAttribute('border', 1);
    var row = document.createElement("thead"); //creates a HTML thead, to differentiate from the rest of the table
    var col = document.createElement("th"); //creates the corner cell that will be empty
    var text = document.createTextNode("");
    col.appendChild(text);  //takes the cell and appends it to the column
    row.appendChild(col); //takes the column and appends it to the row
    for(var j = fhorz; j <= shorz; j++) {   //for loop to get the first header row
        var col = document.createElement("th");
        var text = document.createTextNode(j);
        col.appendChild(text);
        row.appendChild(col);
    }
    table.appendChild(row); //adds the header row to the table
    var body = document.createElement("tbody"); //creates HTML tbody for the rest of the rows.
    for (var i = fvert; i <= svert; i++) { // for loop for each column
        var row = document.createElement("tr"); // creating the HTML row
        var col = document.createElement("th"); // the first element of the row is also a header cell
        var text = document.createTextNode(i);
        col.appendChild(text);
        row.appendChild(col);
        for (var j = fhorz; j <= shorz; j++) { //nested loop to make a column in each row
            var col = document.createElement("td");
            var text = document.createTextNode(i * j); //multiplication calculation
            col.appendChild(text);
            row.appendChild(col);
        }
        body.appendChild(row); //adding newly made row to body 
    }
    table.appendChild(body); //adding body to the table
    return table;
}