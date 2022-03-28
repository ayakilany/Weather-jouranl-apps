// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 3000;           // listening the server at port 3000
app.listen(port, function () {
    console.log(`server is running on port ${port}`);
});

app.get('/res', function (req, res) {      //get to send the projectDta to the updateUi function to be shwon on screen
    res.send(projectData);          //the response is to send the projectData object
    console.log(projectData);           //printing the data in the terminal
});

app.post('/addData', function (req, res) {    //post to receive data from the post function and to store it in projectDta object
    projectData = {
        date: req.body.date,          //requesting the date 
        temp: req.body.temp,          //requesting the temp
        content: req.body.content
    }        //requesting the user feeings
    res.send(projectData)                                //sending projectData object to console    
});