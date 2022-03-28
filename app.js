//const { response } = require("express");
/* Global Variables */
const enterZip = document.getElementById('zip');
const todayTemp = document.getElementById('temp');
const todayDate = document.getElementById('date');
const userFeelings = document.getElementById('content');
//const { get } = require("http");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}&units=metric";//adding units = metrics to url to geting temp in celsuis
const apiCredentials = 'ec9c17258012fa692b4be48ff4767e08';   //getting the api from openweather website

const postTemperature = async function (url = '', data = {}) {  //posting data to the server
    await fetch(url, {                          //calling the same url of the post at the server
        method: 'POST',                         //it's a post not get methods 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',          //making header like body json 
        },
        body: JSON.stringify(data),
    })
    try {
        return data;
    } catch (error) {
        console.log('Error', error);

    }
}

const updateUi = async function () {
    const resp = await fetch('/res');  //getting data from the server by calling the same url as the get at the server
    try {
        const data = await resp.json();  //modifying the getting data to be readable
        todayDate.innerHTML = data.date;    //the output that will be appear to the user
        todayTemp.innerHTML = data.temp;
        userFeelings.innerHTML = data.content;
    }
    catch (error) {
        console.log('Error', error);
    }
}

document.querySelector("#generate").addEventListener('click', async function () {
    if (!enterZip.value) {
        alert('Please enter Zip Code');
    } else {//3functions to be called
        const newUrl = baseUrl.replace('{zip code}', enterZip.value).replace('{API key}', apiCredentials);//replaceing zip code and api key
        const getTemperature = await fetch(newUrl); //get data from the url
        const t = await getTemperature.json();  //modify the data to be readable
        const onlyTemp = t.main.temp;   //get only the temperature           
        let UserInput = document.getElementById('feelings').value;   //value of the user feeling

        postTemperature('/addData', { date: newDate, temp: onlyTemp, content: UserInput }) //calling the post function to send data to the server

            .then(updateUi())   //calling the updateUi function to get the data from the server on show it on the screen
    }
}
);
