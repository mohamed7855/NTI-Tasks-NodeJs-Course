const deal = require("../helper/dealWithJson");
const fileName = "./models/task.json";
class Task {
  static all = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    res.render("all", {
      pageTitle: "allTasks",
      allTasks,
      hasData: allTasks.length,
    });
  };

  static add = (req, res) => {
    res.render("add", { pageTitle: "addTask" });
  };

  static addLogic = (req, res) => {
    const newTask = { id: Date.now(), status: false, ...req.query };
    let allTasks = deal.readJsonData(fileName);
    allTasks.push(newTask);
    deal.writeJsonData(fileName, allTasks);
    res.redirect("/");
  };

  static show = (req, res) => {
    const Task = deal
      .readJsonData(fileName)
      .find((task) => task.id == req.params.id);
    res.render("show", { pageTitle: "showTask", Task });
  };

  static deleteAll = (req, res) => {
    deal.writeJsonData(fileName, []);
    res.redirect("/");
  };

  static delete = (req, res) => {
    deal.writeJsonData(
      fileName,
      deal.readJsonData(fileName).filter((task) => task.id != req.params.id)
    );
    res.redirect("/");
  };

  static edit = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    const id = req.params.id;
    const task = allTasks.find((ele) => ele.id == id);
    res.render("edit", { pageTitle: "editTask", task });
  };

  static editLogic = (req, res) => {
    const id = req.params.id;
    let allTasks = deal.readJsonData(fileName);
    const index = allTasks.findIndex((u) => u.id == id);
    allTasks[index] = { id, status: allTasks[index].status, ...req.query };
    deal.writeJsonData(fileName, allTasks);
    res.redirect(`/show/${id}`);
  };
  static activate = (req, res) => {
    const allTasks = deal.readJsonData(fileName);
    const id = req.params.id;
    const index = allTasks.findIndex((ele) => ele.id == id);
    if ((allTasks[index].status = true)) deal.writeJsonData(fileName, allTasks);
    else {
    }
    res.redirect("/");
  };

  static search = (req, res) => {
    let allTasks = deal.readJsonData(fileName);
    let data = "h";
    // let data = document.getElementById("myInput").value;
    allTasks = allTasks.filter(
      (ele) => ele.title.includes(data) || ele.content.includes(data)
    );
    res.render("all", {
      pageTitle: "allTasks",
      allTasks,
      hasData: allTasks.length,
    });
  };
}

module.exports = Task;
