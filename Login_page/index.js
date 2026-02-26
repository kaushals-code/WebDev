import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
 
// Database

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "permalist",
    password: "Kaushal@21",
    port: 5432
});
db.connect();

// External END POINTS here

app.post("/login_new", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const artist = req.body.artist;

    db.query("INSERT INTO scratch (username, password, artist) VALUES ($1, $2, $3);", [username, password, artist]);
    res.redirect("/");

});

app.post("/login_old", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await db.query("SELECT password FROM scratch WHERE username = $1", [username]);
    if (password === response.rows[0].password) {
        // res.redirect("/logedin");
        // console.log(response);
        res.redirect("/logedin");
    } else {
        res.json(
            password.rows
        );
    }
});

app.use("/logedin", (req, res) => {
    res.sendFile(__dirname + "/logedin.html");
});

app.use("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

app.use("/forgot", (req, res) => {
    res.sendFile(__dirname + "/forgot.html");
});

// Main GET
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// App Listenes here
app.listen(port, (req, res) => {
    console.log("Application running on 3000");
});