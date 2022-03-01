require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());
const moviesRouter = require("./app/routes/movies");
app.use("/movies", moviesRouter);
const userRouter = require("./app/routes/user");
app.use("/user", userRouter);

const cartRouter = require("./app/routes/cart");
app.use("/cart", cartRouter);

app.listen(process.env.PORT || 3700, () => console.log("Server Started"));
