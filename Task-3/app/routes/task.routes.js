const TaskController = require("../controller/taskController");
const router = require("express").Router();
router.get("/", TaskController.all);
router.get("/add", TaskController.add);
router.get("/addLogic", TaskController.addLogic);
router.get("/single/:id", TaskController.single);
router.get("/deleteAll", TaskController.deleteAll);
router.get("/delete/:id", TaskController.delete);
router.get("/edit/:id", TaskController.edit);
router.get("/editLogic", TaskController.editLogic);

module.exports = router;
