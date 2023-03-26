const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = 6868;

// connexion à la DB
connectDB();

const app = express();

// Middleware qui permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

app.use("/chicken", require("./routes/chicken.routes"));

// Lancer le server
app.listen(PORT, () => console.log("server is runinnng on port " + PORT));