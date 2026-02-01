require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No API Key found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // For google-generative-ai SDK, we might not have a direct listModels method on the main class 
        // depending on version, but usually it is on the ModelManager or similar.
        // Actually, for the JS SDK, it's not always directly exposed easily for valid models.
        // However, we can try a simple query to 'gemini-1.5-flash' and 'gemini-pro' to see which succeeds.

        const toTry = ['gemini-1.5-flash', 'gemini-1.5-flash-001', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];

        console.log("Testing Model Availability...");

        for (const modelName of toTry) {
            try {
                console.log(`Testing ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`✅ ${modelName} SUCCESS:`, response.text().substring(0, 20) + "...");
            } catch (error) {
                console.log(`❌ ${modelName} FAILED:`, error.message.split(']')[1] || error.message);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
