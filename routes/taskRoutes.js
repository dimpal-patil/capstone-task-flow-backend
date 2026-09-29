const express = require("express");

const router = express.Router();

const verifyAuthentication = require("../middleware/verifyAuthentication");
const taskController = require("../controllers/taskController");

router.use(verifyAuthentication);

router.post("/:projectId/tasks", taskController.createTask);

router.get("/:projectId/tasks", taskController.getTasks);

router.get("/:projectId/tasks/:id", taskController.getTask);

router.put("/:taskId", taskController.updateTask);

router.delete("/:taskId", taskController.deleteTask);

module.exports = router;