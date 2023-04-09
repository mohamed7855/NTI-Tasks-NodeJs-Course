const deal = require("../helper/dealWithJson");
const fileName = "./models/task.json";
const connectDb = require("../helper/dbController");
const ObjectId = require("mongodb").ObjectId;

class Task {
  static all = async (req, res) => {
    try {
      connectDb(async (db) => {
        const allTasks = await db.collection("Tasks").find().toArray();
        res.render("all", {
          pageTitle: "allTasks",
          allTasks,
          hasData: allTasks.length,
        });
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static add = (req, res) => {
    res.render("add", { pageTitle: "addTask" });
  };

  static addLogic = async (req, res) => {
    const newTask = { status: false, ...req.query };
    try {
      connectDb(async (db) => {
        await db.collection("Tasks").insertOne(newTask);
        res.redirect("/");
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static show = async (req, res) => {
    try {
      connectDb(async (db) => {
        const Task = await db
          .collection("Tasks")
          .findOne({ _id: new ObjectId(req.params.id) });
        res.render("show", { pageTitle: "showTask", Task });
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static deleteAll = (req, res) => {
    try {
      connectDb(async (db) => {
        await db.collection("Tasks").deleteMany();
        res.redirect("/");
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static delete = (req, res) => {
    try {
      connectDb(async (db) => {
        await db
          .collection("Tasks")
          .deleteOne({ _id: new ObjectId(req.params.id) });
        res.redirect("/");
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static edit = (req, res) => {
    try {
      connectDb(async (db) => {
        const Task = await db
          .collection("Tasks")
          .findOne({ _id: new ObjectId(req.params.id) });
        res.render("edit", { pageTitle: "editTask", Task });
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static editLogic = async (req, res) => {
    const updatedTask = { ...req.query };
    try {
      connectDb(async (db) => {
        await db
          .collection("Tasks")
          .updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedTask }
          );
        res.redirect(`/show/${req.params.id}`);
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static activate = (req, res) => {
    try {
      connectDb(async (db) => {
        const Task = await db
          .collection("Tasks")
          .updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { status: true } }
          );
        res.redirect(`/`);
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };

  static search = (req, res) => {
    // let data = document.getElementById("myInput").value;
    try {
      let data = req.query.search;
      connectDb(async (db) => {
        const searchTasks = await db
          .collection("Tasks")
          .find({ $or: [{ title: { $regex: data } }, { content: data }] })
          .toArray();
        res.render("all", {
          pageTitle: "searchTasks",
          allTasks: searchTasks,
          hasData: searchTasks.length,
        });
      });
    } catch (error) {
      console.log(error.message());
      res.render(error404);
    }
  };
}

module.exports = Task;
