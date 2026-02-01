const API_URL = import.meta.env.PROD 
    ? 'https://ai-wellness-q1n8.onrender.com' 
    : 'http://localhost:5000';

console.log("Current API_URL:", API_URL);

export default API_URL;
