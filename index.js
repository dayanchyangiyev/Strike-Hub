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
    const error_path = path.join(__dirname, "public", "resurse", "json", "erori.json");
    const continutFisier = fs.readFileSync(error_path, "utf-8");

    obGlobal.obErrors = JSON.parse(continutFisier);

    obGlobal.obErrors.eroare_default.imagine =
        obGlobal.obErrors.cale_baza + obGlobal.obErrors.eroare_default.imagine;

    for (let eroare of obGlobal.obErrors.info_erori) {
        eroare.imagine = obGlobal.obErrors.cale_baza + eroare.imagine;
    }
}

initErrors();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
    res.locals.ip = req.ip;
    next();
});

app.use(function (req, res, next) {
    if (req.path.endsWith(".ejs")) {
        return renderError(res, 400);
    }

    next();
});

app.use(function (req, res, next) {
    const restrictedFolders = ["/css/", "/resurse/", "/views/"];

    if (restrictedFolders.some(folder => req.path.startsWith(folder)) && req.path.endsWith("/")) {
        return renderError(res, 403);
    }

    next();
});

app.use(express.static(path.join(__dirname, "public")));


// Create a simple route
app.get(["/", "/index", "/home"], (req, res) => {
    res.render("pages/index", {
        title: "Strike-Hub"
    });
});



function renderError(res, identificator, titlu, text, imagine) {
    let errorItem = obGlobal.obErrors.info_erori.find(item => item.identificator == identificator);

    // 1 & 3: If identificator exists use it, if missing use eroare_default
    if (!errorItem) {
        let defaultError = obGlobal.obErrors.eroare_default;
        errorItem = {
            identificator: identificator || "Eroare",
            titlu: defaultError.titlu,
            text: defaultError.text,
            imagine: defaultError.imagine
        };
    } else {
        errorItem = Object.assign({}, errorItem);
    }

    // 2: If titlu/text/imagine are given as function arguments: they override the JSON data.
    if (titlu) errorItem.titlu = titlu;
    if (text) errorItem.text = text;
    if (imagine) errorItem.imagine = obGlobal.obErrors.cale_baza + imagine;

    // 4: If the error has status: true: set the HTTP status code
    if (errorItem.status === true) {
        res.status(errorItem.identificator);
    }

    res.render("pages/eroare", {
        title: errorItem.titlu,
        identificator: errorItem.identificator,
        titlu: errorItem.titlu,
        text: errorItem.text,
        image: errorItem.imagine
    });
}

// This must be the LAST app.get()
app.get(/(.*)/, (req, res) => {
    let page = req.params[0];
    if (page.startsWith('/')) {
        page = page.substring(1);
    }

    res.render(`pages/${page}.ejs`, function (error, renderedResult) {
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
