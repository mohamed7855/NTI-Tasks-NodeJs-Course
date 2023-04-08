const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
require("../DB/dbConnect");

const staticDir = path.join(__dirname, "../resources/public");
const viewsDir = path.join(__dirname, "../resources/views");
const partialsDir = path.join(__dirname, "../resources/layout");

app.use(express.static(staticDir));
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

// to Use method post (req.body)
app.use(express.urlencoded({ extended: true }));

const taskRoutes = require("./routes/task.routes");
app.use(taskRoutes);
app.use("*", (req, res) => {
  res.render("error404", { pageTitle: "ErrorPage" });
});
module.exports = app;
