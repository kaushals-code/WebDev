import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.render("index.ejs", {
        dayType: "Weekday",
        advice: "It's time to work hard", 
    });
});

app.listen(port, () => {
    console.log("server runnig of 3000");
});