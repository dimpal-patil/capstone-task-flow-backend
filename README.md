# Project & Task Management API

A RESTful API built with **Node.js, Express, MongoDB, Mongoose, and JWT** for managing projects and tasks securely.

## Features

* User registration and login
* JWT authentication
* Protected API routes
* Project CRUD operations
* Task CRUD operations
* Project ownership authorization
* Tasks associated with projects
* MongoDB database with Mongoose

## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv

## Project Structure

```text
backend-development-project/
├── controllers/
│   ├── userController.js
│   ├── projectController.js
│   └── taskController.js
├── middleware/
│   └── verifyAuthentication.js
├── models/
│   ├── user-model.js
│   ├── project-model.js
│   └── task-model.js
├── routes/
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
```

Start the server:

```bash
node server.js
```

Or:

```bash
npm run dev
```

## Authentication

Protected routes require a JWT:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

The authenticated user is available through:

```js
req.user._id
```

## Project API

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/projects`     | Create project      |
| GET    | `/api/projects`     | Get user's projects |
| GET    | `/api/projects/:id` | Get project         |
| PUT    | `/api/projects/:id` | Update project      |
| DELETE | `/api/projects/:id` | Delete project      |

### Create Project

```http
POST /api/projects
```

Body:

```json
{
  "name": "Authentication Project",
  "description": "Build authentication and authorization APIs"
}
```

The project owner is automatically taken from the authenticated user's JWT.

## Task API

| Method | Endpoint                             | Description       |
| ------ | ------------------------------------ | ----------------- |
| POST   | `/api/projects/:projectId/tasks`     | Create task       |
| GET    | `/api/projects/:projectId/tasks`     | Get project tasks |
| GET    | `/api/projects/:projectId/tasks/:id` | Get task          |
| PUT    | `/api/projects/:taskId`              | Update task       |
| DELETE | `/api/projects/:taskId`              | Delete task       |

### Create Task

```http
POST /api/projects/:projectId/tasks
```

Body:

```json
{
  "title": "Build Login API",
  "description": "Create JWT authentication",
  "status": "To Do"
}
```

Supported statuses:

```text
To Do
In Progress
Done
```

## Security

The relationship between resources is:

```text
User
 └── Project
      └── Task
```

Users can only access or modify their own projects and the tasks belonging to those projects.

## Testing

Use **Postman** to:

1. Register a user.
2. Login and get the JWT.
3. Create a project.
4. View, update, and delete the project.
5. Create tasks inside the project.
6. View, update, and delete tasks.
7. Test authorization using another user's project/task.


