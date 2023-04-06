const TaskController = require("../controller/taskController");
const router = require("express").Router();
router.get("/", TaskController.all);

module.exports = router;
