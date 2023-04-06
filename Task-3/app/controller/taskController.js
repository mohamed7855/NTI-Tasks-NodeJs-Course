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
    const newTask = { id: Date.now(), ...req.query };
    let allTasks = deal.readJsonData(fileName);
    allTasks.push(newTask);
    deal.writeJsonData(fileName, allTasks);
    res.redirect("/");
  };

  static single = (req, res) => {
    const Task = deal
      .readJsonData(fileName)
      .find((task) => task.id == req.params.id);
    res.render("single", { pageTitle: "singleTask", Task });
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
    // res.send(task);
    res.render("edit", { pageTitle: "editTask", task });
  };

  static editLogic = (req, res) => {
    res.redirect("/");
  };
}

module.exports = Task;
