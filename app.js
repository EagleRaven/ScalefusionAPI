import axios from "axios";

//const axios = require('axios');

// Device id 4328483
// Deviec name ELMC SP#1

const API_KEY = '12b864629a6b43c6b02e8786084cf051';
const BASE_URL = 'https://api.scalefusion.com';

const headers = {
    'Authorization': `Token ${API_KEY}`,
    'Content-Type': 'application/json'
};

async function sendMessage(deviceID, message){
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/devices/broadcast_message.json`, {
            device_ids: deviceID,
            sender_name: "Ryan APP Test",
            message_body: message,
            keep_ringing: "false",
            show_as_dialog: "true"
        }, { headers });

        console.log("Message sent successfully: ", message)
    }
    catch(error){
        if(error.response){
            console.error('Error:', error.response.status, error.response.data);
        }
        else if(error.request){
            console.error("No response received:", error.request);
        }
        else{
            console.error("Error setting up request:", error.message);
        }
    }
}

async function getDevices() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/devices.json`, { headers });

        // Get main data
        const data = response.data;
        //console.log(data.devices[0]);

        // Get specific device
        const devices = data.devices[0];
       // console.log("This is devices")
        //console.log(devices);
        
        // Get the ID number of the device
        const deviceID = devices.device.id;
        console.log("Device ID:", deviceID);

        const message = "Hi there - this is a test from Ryans program";

        await sendMessage(deviceID, message);


    } catch (error) {
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Error:', error.response.status, error.response.data);
        } else if (error.request) {
            // No response received
            console.error('No response received:', error.request);
        } else {
            // Error setting up the request
            console.error('Error setting up request:', error.message);
        }
    }
}

getDevices();


