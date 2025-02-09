const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { getJson } = require("serpapi");

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS with explicit configuration
app.use(cors({
    origin: '*', // Allow all origins temporarily (use specific domain for production)
    methods: ['GET', 'POST'], // Allow GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow credentials if needed
}));

// Handle preflight requests
app.options('*', cors());

// Debugging incoming requests
app.use((req, res, next) => {
    console.log("Incoming Request:");
    console.log("Origin:", req.headers.origin);
    console.log("Method:", req.method);
    next();
});


// Stores all the serpAPI data into this local server so we can than
// access this information later on
app.get('/',(req, res) => {

    getJson({
        // Using the google_jobs search engine
        engine: "google_jobs",
        // The type of jobs we want the server to gather
        q: "Developer careers",
        // The location we want those jobs to locate from
        location: "Vancouver, British Columbia, Canada",
        api_key: process.env.API_KEY
    }, (json, error) => {
        if (error) {
            console.error("Error fetching job data:", error);
            res.status(500).json({error: "Error fetching job data"});
            return;
        }

        // Send the jobs data as JSON response
        if (json && json["jobs_results"]) {
            res.status(200).json(json["jobs_results"]);
        } else {
            res.status(404).json({error: "No job results found"});
        }
    });

});

// Used to get display a message to the console to let us know the server is running.
app.listen(port,"0.0.0.0",() => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});
