# Task Flow Backend — Project & Task Management API

A RESTful API built with **Node.js, Express, MongoDB, Mongoose, and JWT** for managing projects and tasks securely.

## Deployment

**Live Application:**
https://capstone-task-flow-frontend-e92hw5rkd-dimpal-patils-projects.vercel.app/login

**Frontend Repository:**
https://github.com/dimpal-patil/capstone-task-flow-frontend

**Backend Repository:**
https://github.com/dimpal-patil/capstone-task-flow-backend

> **Note:** TaskFlow uses separate frontend and backend repositories.
> The frontend communicates with the deployed backend API, so both services work together to provide the complete application.


## Features

- User registration and login
- JWT authentication
- Protected API routes
- Project CRUD operations
- Task CRUD operations
- Project ownership authorization
- Tasks associated with projects
- MongoDB database with Mongoose
- CORS enabled and request logging with Morgan

## Technologies

- Node.js
- Express.js (v5)
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors
- morgan
- nodemon (dev)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A MongoDB database — either a local [MongoDB](https://www.mongodb.com/try/download/community) instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

Check your versions:

```bash
node -v
npm -v
```

## Project Structure

```text
task-flow-backend/
├── config/
│   └── db-connection.js
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

1. Clone the repository:

```bash
git clone <your-repo-url>
cd task-flow-backend
```

2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of the project (next to `server.js`):

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key_here
```

| Variable  | Description                                   | Example                                            |
| --------- | --------------------------------------------- | -------------------------------------------------- |
| `PORT`    | Port the server listens on                    | `3000`                                             |
| `MONGO_URI` | MongoDB connection string                   | `your_mongodb_connection_string`                   |
| `JWT_KEY` | Secret key used to sign JWT tokens            | `your_jwt_secret_key_here`                         |

> **Note:** For MongoDB Atlas, your `MONGO_URI` will look like:
> `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/task_flow_app`

## Running Locally

### Development (with auto-reload)

```bash
npm run dev
```

This uses **nodemon**, which restarts the server automatically when you edit files.

Once running, you should see:

```text
MongoDB connected ...
Server is running on port: http://localhost:3000
```

The API base URL is: `http://localhost:3000`

## Authentication

Protected routes require a JWT in the header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The authenticated user is available on the request as:

```js
req.user._id
```

## API Endpoints

### Auth

| Method | Endpoint            | Description            | Auth required |
| ------ | ------------------- | ---------------------- | ------------- |
| POST   | `/api/auth/register`| Register a new user    | No            |
| POST   | `/api/auth/login`   | Login and get JWT      | No            |
| GET    | `/api/auth/`        | Get current user info  | Yes           |

**Register** — `POST /api/auth/register`

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login** — `POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Projects

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/projects`     | Create project      |
| GET    | `/api/projects`     | Get user's projects |
| GET    | `/api/projects/:id` | Get project         |
| PUT    | `/api/projects/:id` | Update project      |
| DELETE | `/api/projects/:id` | Delete project      |

**Create Project** — `POST /api/projects`

```json
{
  "name": "Authentication Project",
  "description": "Build authentication and authorization APIs"
}
```

The project owner is automatically taken from the authenticated user's JWT.

### Tasks

| Method | Endpoint                                 | Description       |
| ------ | ---------------------------------------- | ----------------- |
| POST   | `/api/projects/:projectId/tasks`         | Create task       |
| GET    | `/api/projects/:projectId/tasks`         | Get project tasks |
| GET    | `/api/projects/:projectId/tasks/:id`     | Get task          |
| PUT    | `/api/projects/:taskId`                  | Update task       |
| DELETE | `/api/projects/:taskId`                  | Delete task       |

> Task routes are also mounted under `/api/tasks`, so `/api/tasks/:projectId/tasks/...` works too.

**Create Task** — `POST /api/projects/:projectId/tasks`

```json
{
  "title": "Build Login API",
  "description": "Create JWT authentication",
  "status": "To Do",
  "priority": "High"
}
```

Supported statuses:

```text
To Do
In Progress
Done
```

Supported priorities (optional, defaults to `Medium`):

```text
Low
Medium
High
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

Use **Postman** (or Thunder Client / curl) to:

1. Register a user — `POST /api/auth/register`
2. Login and get the JWT — `POST /api/auth/login`
3. Create a project — `POST /api/projects`
4. View, update, and delete the project
5. Create tasks inside the project
6. View, update, and delete tasks
7. Test authorization using another user's project/task (should be denied)

> **Why test with a second user?** The frontend UI only *shows* the logged-in
> user their own projects, but that alone is not security — anyone can call the
> API directly (Postman, curl, browser dev tools) with any valid token. The API
> itself must reject requests where a user tries to access another user's
> project/task IDs, even if those IDs are valid. Use a tool like Postman to
> verify this, since the frontend normally never sends such requests.


