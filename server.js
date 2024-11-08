const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { getJson } = require("serpapi");

const app = express();
const port = 8000;

app.use(cors()); //Enable CORS for all routes

app.get('/',(req, res) => {

    getJson({
        //userID: "to be filled",
        engine: "google_jobs",
        q: "Developer careers",
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

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
