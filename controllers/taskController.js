const Task = require("../models/task-model");
const Project = require("../models/project-model");

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority} = req.body;
        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to create a task in this project"
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            project: project._id
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });
    }
};


// GET ALL TASKS
const getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        // 1. Find project
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // 2. Check project ownership
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to view these tasks"
            });
        }

        // 3. Find all tasks for this project
        const tasks = await Task.find({
            project: projectId
        });

        res.status(200).json({
            tasks
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get tasks",
            error: error.message
        });
    }
};


// GET ONE TASK
const getTask = async (req, res) => {
    try {
        const { projectId, id } = req.params;

        const task = await Task.findOne({
            _id: id,
            project: projectId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to view this task"
            });
        }

        res.status(200).json({
            task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get task",
            error: error.message
        });
    }
};


// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // 1. Find the task
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // 2. Find the parent project from the task
        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // 3. Check project ownership
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this task"
            });
        }

        // 4. Update the task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
};

// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // 1. Find the task
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // 2. Find the parent project
        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // 3. Check project ownership
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this task"
            });
        }

        // 4. Delete the task
        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};