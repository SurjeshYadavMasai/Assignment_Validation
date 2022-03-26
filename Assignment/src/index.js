const express = require("express");
const app = express();
app.use(express.json());

const userController = require("./controllers/user.controllers.js");
app.use("/users", userController);