// Device id 4328483
// Device name ELMC SP#1

require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + '/../views');

// Serve static files (css etc)
app.use(express.static(path.join(__dirname, '/../public')));


// Route 
app.get('/', async (req, res) =>{
    try{
        // const API_KEY = process.env.API_KEY;
        // const BASE_URL = 'https://api.scalefusion.com';

        res.render('index')
    }
    catch(error){
        if(error.response){
            console.log("There is an error");
        }
    }
})

let webhookData = {};

app.post('/webhook', (req, res) => {
    // Log the webhook payload for debugging
    webhookData = req.body;
    console.log('Received webhook:', req.body);

    // Respond with a 200 status code to acknowledge receipt
    res.status(200).send('Webhook received successfully');
  });

app.get('/webhook', (req, res) => {

    res.render('webhook', { data: webhookData });
    console.log(webhookData);
})

// Use this only for running nodemon
app.listen(3000)

// const headers = {
//     'Authorization': `Token ${API_KEY}`,
//     'Content-Type': 'application/json'
// };

// async function sendMessage(deviceID, message){
//     try {
//         const response = await axios.post(`${BASE_URL}/api/v1/devices/broadcast_message.json`, {
//             device_ids: deviceID,
//             sender_name: "Ryan APP Test",
//             message_body: message,
//             keep_ringing: "false",
//             show_as_dialog: "true"
//         }, { headers });

//         console.log("Message sent successfully: ", message)
//     }
//     catch(error){
//         if(error.response){
//             console.error('Error:', error.response.status, error.response.data);
//         }
//         else if(error.request){
//             console.error("No response received:", error.request);
//         }
//         else{
//             console.error("Error setting up request:", error.message);
//         }
//     }
// }

// async function getDevices() {
//     try {
//         const response = await axios.get(`${BASE_URL}/api/v1/devices.json`, { headers });

//         // Get main data
//         const data = response.data;

//         // Get specific device
//         const devices = data.devices[0];
        
//         // Get the ID number of the device
//         const deviceID = devices.device.id;
//         console.log("Device ID:", deviceID);

//         //console.log(devices)

//         const message = "Hi there - this is a test from Ryans program";

//         // This sends the message
//         //await sendMessage(deviceID, message);


//     } catch (error) {
//         if (error.response) {
//             // Server responded with a status code outside the 2xx range
//             console.error('Error:', error.response.status, error.response.data);
//         } else if (error.request) {
//             // No response received
//             console.error('No response received:', error.request);
//         } else {
//             // Error setting up the request
//             console.error('Error setting up request:', error.message);
//         }
//     }
// }

// getDevices();

module.exports = app;
