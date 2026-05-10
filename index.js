const express = require("express");
const path = require("path");
const fs = require("fs");

// Create the Express server/app object
const app = express();
const port = 3000;

const obGlobal = {
    obErrors: null
};


function initErrors() {
    const error_path = path.join(__dirname, "public/resurse/json/erori.json");
    obGlobal.obErrors = require(error_path);
}

initErrors();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Create a simple route
app.get(["/", "/index", "/home"], (req, res) => {
    res.render("pages/index", {
        title: "Strike-Hub"
    });
});



function renderError(res, identifier, title, text, image) {
    let errorItem = obGlobal.obErrors.info_erori.find(item => item.identificator == identifier);
    
    if (!errorItem || errorItem.status === false) {
        let defaultError = obGlobal.obErrors.eroare_default;
        errorItem = {
            identificator: identifier || "Eroare",
            titlu: title || defaultError.titlu,
            text: text || defaultError.text,
            imagine: image || defaultError.imagine
        };
    } else {
        errorItem = Object.assign({}, errorItem);
        if (title) errorItem.titlu = title;
        if (text) errorItem.text = text;
        if (image) errorItem.imagine = image;
    }
    
    const imagePath = obGlobal.obErrors.cale_baza + errorItem.imagine;
    const statusCode = typeof identifier === 'number' ? identifier : 400;
    
    res.status(statusCode).render("pages/eroare", {
        title: errorItem.titlu,
        errorItem: errorItem,
        imagePath: imagePath
    });
}

// This must be the LAST app.get()
app.get(/(.*)/, (req, res) => {
    let page = req.params[0];
    if (page.startsWith('/')) {
        page = page.substring(1);
    }

    res.render(`pages/${page}`, function(error, renderedResult) {
        if (error) {
            if (error.message.startsWith("Failed to lookup view")) {
                return renderError(res, 404);
            } else {
                return renderError(res);
            }
        }
        res.send(renderedResult);
    });
});

// Start listening on port 3000
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
