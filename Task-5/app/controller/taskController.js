const taskModel = require("../../DB/models/tasks.model");
class Task {
  static all = async (req, res) => {
    try {
      const allTasks = await taskModel.find();
      res.render("all", {
        pageTitle: "allTasks",
        allTasks,
        hasData: allTasks.length,
      });
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };

  static add = (req, res) => {
    res.render("add", { pageTitle: "addTask" });
  };

  static addLogic = async (req, res) => {
    try {
      const task = new taskModel(req.query);
      await task.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.render("error404");
    }
  };

  static show = async (req, res) => {
    try {
      const Task = await taskModel.findById(req.params.id);
      res.render("show", { pageTitle: "showTask", Task });
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };

  static deleteAll = async (req, res) => {
    try {
      await taskModel.deleteMany();
      res.redirect("/");
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };

  static delete = async (req, res) => {
    try {
      await taskModel.deleteOne({ _id: req.params.id });
      res.redirect("/");
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };

  static edit = async (req, res) => {
    try {
      const Task = await taskModel.findById(req.params.id);
      res.render("edit", { pageTitle: "editTask", Task });
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };

  static editLogic = async (req, res) => {
    try {
      await taskModel.findByIdAndUpdate(req.params.id, req.query, {
        runValidators: true,
      });
      // await taskModel.updateOne({ _id: req.params.id }, { $set: { ...req.query } });
      res.redirect(`/show/${req.params.id}`);
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };

  static activate = async (req, res) => {
    try {
      await taskModel.updateOne(
        { _id: req.params.id },
        { $set: { status: true } }
      );
      res.redirect(`/`);
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };

  static search = async (req, res) => {
    // let data = document.getElementById("myInput").value;
    let data = "/h/";
    try {
      const searchTasks = await taskModel.find({
        $or: [{ title: { $regex: /h/ } }, { content: /h/ }],
      });
      res.render("all", {
        pageTitle: "searchTasks",
        allTasks: searchTasks,
        hasData: searchTasks.length,
      });
    } catch (error) {
      console.log(error.message());
      res.render("error404");
    }
  };
}

module.exports = Task;
