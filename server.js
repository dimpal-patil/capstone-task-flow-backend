require("dotenv").config();
require("./config/db-connection");

const express = require("express");
const path = require("path");
const morgan = require('morgan');
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const authRouter = require("./routes/userRoutes");
app.use("/api/auth", authRouter);

const projectRoutes = require("./routes/projectRoutes");

app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/taskRoutes");

app.use("/api/projects", taskRoutes);
app.use("/api/tasks", taskRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
