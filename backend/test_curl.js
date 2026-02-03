require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

async function testDirect() {
    console.log("Testing Direct REST API...");
    try {
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: "Hello" }] }]
        });
        console.log("✅ SUCCESS:", response.data);
    } catch (error) {
        console.log("❌ FAILED:");
        console.log("Status:", error.response?.status);
        console.log("Data:", JSON.stringify(error.response?.data, null, 2));
    }
}

testDirect();
