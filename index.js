const express = require("express");

// Create the Express server/app object
const app = express();
const port = 3000;

console.log("__dirname:", __dirname);
console.log("__filename:", __filename);
console.log("process.cwd():", process.cwd());

// Create a simple route
app.get("/", (req, res) => {
    res.send("Strike-Hub server is running!");
});

// Start listening on port 3000
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
