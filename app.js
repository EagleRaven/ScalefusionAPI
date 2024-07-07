import axios from "axios";

//const axios = require('axios');



const API_KEY = '12b864629a6b43c6b02e8786084cf051';
const BASE_URL = 'https://api.scalefusion.com';

const headers = {
    'Authorization': `Token ${API_KEY}`,
    'Content-Type': 'application/json'
};

async function getDevices() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/devices.json`, { headers });
        const data = response.data;
        console.log(data.devices);
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
