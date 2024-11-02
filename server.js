require('dotenv').config()
const { getJson } = require("serpapi");
const { createServer } = require('node:http');


const hostname = '127.0.0.1';
const port = 8000;
const server = createServer(async (req, res) => {

    getJson({
        //userID: "to be filled",
        engine: "google_jobs",
        q: "Developer careers",
        location: "Vancouver, British Columbia, Canada",
        api_key: process.env.API_KEY
    }, (json) => {
        console.log(json["jobs_results"]);
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
