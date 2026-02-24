// import bodyParser from "body-parser";
import express from "express";
import pool from "./db.js";

const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());

// app.get("/", (req, res) => {

// });

// app.post("/", (req, res) => {

// });

// app.put("/", (req, res) => {

// });

app.get("/employees", async (req, res) => {
    try {
        const [rows] = await pool.query("select * from employees");
        res.json(rows);
    } catch (error) {
        res.status(404).json({ error : error.message });
    }
});

app.listen(3000, () => {
    console.log("The Application is running on port 3000 FRFRFRFR");
});
