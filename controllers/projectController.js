const Project = require("../models/project-model");


const getProjects = async (req, res) => {
    try {
        const { search } = req.query;

        const query = {
            owner: req.user._id
        };

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const projects = await Project.find(query);

        res.status(200).json({
            projects
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get projects",
            error: error.message
        });
    }
};

const createProject = async (req, res) => {
try {
    const { name, description } = req.body;

    const project = await Project.create({
        name,
        description,
        owner: req.user._id
    });

    res.status(201).json({
        message: "Project created successfully",
        project
    });
} catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Failed to create project",
        error: error.message
    });
}
};

const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Ownership check
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to access this project"
            });
        }

        res.status(200).json({
            project
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get project",
            error: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Ownership check
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this project"
            });
        }

        const { name, description } = req.body;

        project.name = name;
        project.description = description;

        await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update project",
            error: error.message
        });
    }
};


const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Ownership check
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this project"
            });
        }

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete project",
            error: error.message
        });
    }
};

module.exports = {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
};