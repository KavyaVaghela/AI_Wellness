require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Using Key:", apiKey ? apiKey.substring(0, 10) + "..." : "NONE");
        // Access the model manager to list models
        // Note: The SDK structure for listModels might vary, but for v0.21+ it's often on the GoogleGenerativeAI instance or via a fetch workaround if not exposed.
        // Actually, for the current Node SDK, we can't easily list models without a helper, but we can try the `getGenerativeModel` with a known list.

        const modelsToTest = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-pro",
            "gemini-1.5-pro-001",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        console.log("Checking specific models...");
        for (const m of modelsToTest) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent("test");
                console.log(`✅ AVAILABLE: ${m}`);
            } catch (error) {
                if (error.message.includes("404")) {
                    console.log(`❌ NOT FOUND: ${m}`);
                } else {
                    console.log(`⚠️ ERROR (${m}): ${error.message.split('[')[0]}`);
                }
            }
        }

    } catch (e) {
        console.error("Fatal Error:", e);
    }
}

listModels();
