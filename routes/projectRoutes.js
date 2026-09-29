const express = require("express");

const router = express.Router();

const verifyAuthentication = require("../middleware/verifyAuthentication");
const projectController = require("../controllers/projectController");

// Protect all project routes
router.use(verifyAuthentication);

router.get("/", projectController.getProjects);

router.post("/", projectController.createProject);

router.get("/:id", projectController.getProject);

router.put("/:id", projectController.updateProject);

router.delete("/:id", projectController.deleteProject);

module.exports = router;