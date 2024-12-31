require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = 3000;
const {connectDB}=require("./config/connectDB")

app.use(express.json());
app.use(cors());
app.use(helmet());

//create data base connection
connectDB();


app.get("/", (req, res) => {
  res.send("Welcome to event management API.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
