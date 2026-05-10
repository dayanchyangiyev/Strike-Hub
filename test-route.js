const express = require('express');
const app = express();
const path = require("path");

app.get(/(.*)/, (req, res) => {
    let page = req.params[0];
    if (page.startsWith('/')) {
        page = page.substring(1);
    }
    const path_to_page = path.join(process.cwd(), "views", "pages", `${page}.ejs`);
    console.log("path_to_page:", path_to_page);
    res.send("ok");
});

const request = require('http').request;
app.listen(3001, () => {
  request('http://localhost:3001/hello/world', (res) => {
    process.exit(0);
  }).end();
});
