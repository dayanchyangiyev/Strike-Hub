# Strike-Hub 🎯

Salut! Acesta este **Strike-Hub**, un proiect creat special pentru pasionații de Counter-Strike 2. Practic, este un portal unde fanii pot găsi cam tot ce au nevoie: un marketplace pentru skin-uri, tactici și strategii (smoke-uri, flash-uri), transmisiuni live din eSports și un calendar al evenimentelor majore. 

## 🛠️ Tehnologii folosite

Proiectul este construit folosind tehnologii web moderne, atât pentru partea de frontend, cât și pentru backend:

*   **Node.js & Express.js**: Folosite pentru a rula serverul local.
*   **EJS (Embedded JavaScript)**: Motorul de template-uri. Ne ajută să scriem cod HTML dinamic și să refolosim bucăți de cod (cum ar fi header-ul sau footer-ul) pe mai multe pagini.
*   **HTML5 & CSS3**: Pentru structură și design. Am folosit Flexbox și CSS Grid pentru aranjarea elementelor în pagină.
*   **SCSS (Sass)**: Folosit în special pentru bara de navigație (`nav.scss`), pentru a scrie un cod CSS mult mai curat, cu variabile și funcții.
*   **Vanilla JavaScript**: Pentru micile interacțiuni de pe partea de client.

## 📂 Structura proiectului

Ca să fie ușor de înțeles și de modificat, am organizat fișierele destul de logic:

*   **`index.js`**: Este fișierul principal care pornește serverul Express.
*   **`views/`**: Aici stau toate fișierele EJS (HTML-ul dinamic).
    *   **`pages/`**: Conține paginile întregi (ex: `index.ejs` care e pagina principală).
    *   **`fragments/`**: Aici am extras părțile care se repetă, ca să nu scriem același cod de 100 de ori (`head.ejs`, `header.ejs`, `footer.ejs`). Le includem simplu în pagini cu `<%- include(...) %>`.
*   **`css/`**: Foaia de stil principală (`style.css`) și fișierele pentru meniu (`nav.scss` / `nav.css`).
*   **`js/`**: Scripturile de frontend.
*   **`resurse/`**: Toate materialele statice: imagini, iconițe (`ico/`) și documente (`docs/`).

## 🚀 Cum pornești proiectul?

Dacă vrei să rulezi site-ul local pe calculatorul tău, pașii sunt foarte simpli:

1. Asigură-te că ai [Node.js](https://nodejs.org/) instalat.
2. Deschide terminalul în folderul proiectului și instalează dependențele (Express, EJS) rulând:
   ```bash
   npm install
   ```
3. Pornește serverul cu comanda:
   ```bash
   npm start
   ```
   *(sau `node index.js`)*
4. Deschide browser-ul și intră pe [http://localhost:3000](http://localhost:3000).

---
*Proiect realizat pentru pasionații de web și gaming.* 🎮