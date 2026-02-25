import bodyParser from "body-parser";
import express from "express";
import pool from "./db.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// app.get("/", (req, res) => {

// });

// app.post("/", (req, res) => {

// });

// app.put("/", (req, res) => {

// });

app.get("/employees", async (req, res) => {
    try {
        const [info] = await pool.query("SELECT * FROM employees");
        res.status(200).json(info);
    } catch (err) {
        res.status(404).json(err.message);
    }
});

app.post("/add", async (req, res) => {
    try {
        const name = String(req.body.name);
        const age = req.body.age;
        const salary = req.body.salary;

        const [ans] = await pool.query("INSERT INTO employees (name, age, salary) VALUES (?, ?, ?);", [name, age, salary]);
        res.status(200).json(ans);
    } catch (err) {
        res.json({
            error: err.message
        })
    }
});

app.listen(3000, () => {
    console.log("The Application is running on port 3000 FRFRFRFR");
});



/*

    try {
        const [rows] = await pool.query("select * from employees");
        res.status(200).json(rows);
    } catch (error) {
        res.status(404).json({ error : error.message });
    }

*/

