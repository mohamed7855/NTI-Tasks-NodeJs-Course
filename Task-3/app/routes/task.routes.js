const TaskController = require("../controller/taskController");
const router = require("express").Router();
router.get("/", TaskController.all);
router.get("/add", TaskController.add);
router.get("/addLogic", TaskController.addLogic);
router.get("/show/:id", TaskController.show);
router.get("/deleteAll", TaskController.deleteAll);
router.get("/delete/:id", TaskController.delete);
router.get("/edit/:id", TaskController.edit);
router.get("/editLogic/:id", TaskController.editLogic);
router.get("/activate/:id", TaskController.activate);
router.get("/search", TaskController.search);

module.exports = router;
