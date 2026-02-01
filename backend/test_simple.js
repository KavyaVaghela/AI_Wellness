require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
    console.log("Testing gemini-1.5-flash...");
    try {
        // Explicitly trying to force a newer API version if possible, but standard first
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await model.generateContent("Hi");
        console.log("SUCCESS: gemini-1.5-flash");
    } catch (e) {
        console.log("FAIL: gemini-1.5-flash - " + e.message);
    }

    console.log("Testing gemini-pro...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        await model.generateContent("Hi");
        console.log("SUCCESS: gemini-pro");
    } catch (e) {
        console.log("FAIL: gemini-pro - " + e.message);
    }
}
test();
