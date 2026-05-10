const express = require("express");
const path = require("path");

// Create the Express server/app object
const app = express();
const port = 3000;

console.log("__dirname:", __dirname);
console.log("__filename:", __filename);
console.log("process.cwd():", process.cwd());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Create a simple route
app.get("/", (req, res) => {
    res.render("pages/index", {
        title: "Strike-Hub"
    });
});

// Start listening on port 3000
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
