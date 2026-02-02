require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Directly use the key from .env to verify it's being read correctly
const apiKey = process.env.GEMINI_API_KEY;

console.log("-----------------------------------------");
console.log("🔍 DIAGNOSTIC FOR GEMINI API");
console.log("-----------------------------------------");

if (!apiKey) {
    console.error("❌ ERROR: No GEMINI_API_KEY found in .env file");
    process.exit(1);
}

console.log(`✅ API Key detected: ${apiKey.substring(0, 10)}...`);

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel() {
    // Model we are trying to use
    const modelName = "gemini-pro";

    console.log(`\n⏳ Testing connection to model: '${modelName}'...`);

    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        const text = response.text();

        console.log("-----------------------------------------");
        console.log("✅ SUCCESS! The API is working.");
        console.log("🤖 Response:", text);
        console.log("-----------------------------------------");
        console.log("\n👉 If this works, but your app doesn't:");
        console.log("1. 'node server.js' might need a restart.");
        console.log("2. Your Render deployment might still have the OLD key or code.");
    } catch (error) {
        console.log("-----------------------------------------");
        console.log("❌ FAILURE: Could not connect.");
        console.error("Error Details:", error.message);
        console.log("-----------------------------------------");

        if (error.message.includes("404")) {
            console.log("💡 TIP: 404 usually means the Model Name is wrong or not available for your key.");
        } else if (error.message.includes("403") || error.message.includes("API key not valid")) {
            console.log("💡 TIP: 403 means your API Key is invalid or doesn't have permissions (Enable Generative Language API).");
        }
    }
}

testModel();
