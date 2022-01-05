require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conneted to Database"));

app.use(express.json());

const wordRouter = require("./routes/words");
app.use("/words", wordRouter);

app.listen(8000, () => console.log("server Started"));
