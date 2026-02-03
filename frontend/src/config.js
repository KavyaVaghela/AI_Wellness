const API_URL = import.meta.env.PROD
    ? 'https://ai-wellness-companion-1-7wie.onrender.com'
    : 'http://localhost:5000';

console.log("API URL Used:", API_URL);

export default API_URL;
