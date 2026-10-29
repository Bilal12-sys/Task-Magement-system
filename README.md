# Task Management System

A full-stack task management application for organizing everyday work and turning
larger goals into practical, AI-generated plans. Create and update tasks, track
their progress, review completed work, and use the planner to break an idea into
actionable steps.

The project is intended as a useful personal productivity tool and a clear,
approachable example of how a React frontend, REST API, MongoDB, and an external
AI service can work together. Its modular structure also gives contributors a
place to add features such as collaboration, reminders, authentication, and
additional planning tools.

## What it can do

- View a dashboard with task totals and progress.
- Create, edit, view, complete, reopen, and delete tasks.
- Track tasks as `pending`, `in-progress`, or `completed`.
- Add descriptions and optional due dates to tasks.
- Search, filter, and sort tasks; review completed work separately.
- Describe a goal to the AI planner and receive a summary, priority, estimated
  effort, and actionable steps.
- Save an AI-generated plan as a regular task.
- Store task data in MongoDB so it is available after restarting the app.

The AI planner uses OpenRouter from the backend. The OpenRouter key stays on the
server and is never needed by the browser.

## How the application works

1. The React frontend sends task and planning requests to the Express API.
2. The API validates incoming data and handles task operations through
   controllers and services.
3. Mongoose reads and writes tasks in MongoDB.
4. For planning requests, the backend sends the goal to OpenRouter and validates
   the generated plan before returning it to the frontend.

## Technology

- **Frontend:** React, Vite, React Router, GSAP, and Lucide icons.
- **Backend:** Node.js, Express, Joi, and Mongoose.
- **Database:** MongoDB.
- **AI:** OpenRouter chat completions API; the default model is
  `google/gemini-2.5-flash`.
- **Testing and linting:** Node's built-in test runner and Oxlint.

## Project structure

```text
.
├── client/                         # React and Vite frontend
│   ├── src/
│   │   ├── api/                    # HTTP client and task/AI API services
│   │   ├── assets/                 # Images and brand assets
│   │   ├── components/
│   │   │   ├── icons/              # Brand illustrations and icons
│   │   │   ├── intro/              # Intro animation
│   │   │   ├── layout/             # App shell, navigation, and top bar
│   │   │   ├── planner/            # AI plan presentation
│   │   │   ├── tasks/              # Task cards and task dialogs
│   │   │   └── ui/                 # Shared loaders, notices, and UI
│   │   ├── context/                # Shared task state and React hooks
│   │   ├── pages/                  # Dashboard, tasks, AI planner, completed, details, settings
│   │   ├── utils/                  # Shared frontend helpers
│   │   ├── App.css                 # App-level styles
│   │   ├── App.jsx                 # Client-side routes and app composition
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # Frontend entry point
│   ├── index.html                  # Vite HTML entry point
│   ├── .oxlintrc.json              # Oxlint configuration
│   ├── vite.config.js              # Vite and React plugin configuration
│   ├── .env.example                # Frontend environment template
│   ├── package.json                # Frontend scripts and dependencies
│   └── README.md                   # Frontend-specific notes
├── server/                         # Express REST API
│   ├── config/                     # MongoDB connection
│   ├── constants/                  # Shared HTTP status values
│   ├── controllers/
│   │   ├── ai-task/                # AI planning request handler
│   │   └── task/                   # Create, read, update, and delete handlers
│   ├── middleware/                 # Validation and error handling
│   ├── models/                     # Mongoose schemas and models
│   ├── routes/                     # Task and AI API routes
│   ├── services/
│   │   ├── ai-task/                # OpenRouter request and plan parsing
│   │   └── task/                   # Task data operations
│   ├── test/                       # API and service tests
│   ├── validators/                 # Joi request schemas
│   ├── .env.example                # Backend environment template
│   ├── server.js                   # Express app and server startup
│   ├── package.json                # Backend scripts and dependencies
│   └── README.md                   # Backend-specific notes
├── .gitignore
└── README.md
```

Each application has its own dependencies and environment file. Install and run
the frontend and backend separately.

## Requirements

- Node.js and npm.
- A MongoDB connection string (local MongoDB or MongoDB Atlas).
- An OpenRouter API key to use AI task planning. Standard task management works
  without an AI key.

## Run locally

### 1. Configure the backend

In PowerShell, from the repository root:

```powershell
Copy-Item server\.env.example server\.env
Set-Location server
npm install
```

Edit `.env` in the `server` directory and set:

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port; the example uses `1000`. |
| `MONGODB_URI` | MongoDB connection string. |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI planning. |
| `OPENROUTER_MODEL` | Optional model slug; defaults to `google/gemini-2.5-flash`. |

Keep API keys and database credentials private. Do not commit `.env` files.

Start the API from the `server` directory:

```powershell
npm run dev
```

The API starts at `http://localhost:1000` when using the example port. The root
endpoint (`/`) returns a simple service status response.

### 2. Configure the frontend

Open a second terminal at the repository root:

```powershell
Copy-Item client\.env.example client\.env
Set-Location client
npm install
```

Set `VITE_API_URL` in `.env` in the `client` directory to the backend API base URL,
including `/api`. For local development, use:

```dotenv
VITE_API_URL=http://localhost:1000/api
```

When deploying the frontend to Vercel, set `VITE_API_URL` in the Vercel
project's Environment Variables to your **publicly reachable backend URL**,
including `/api` (for example, `https://your-backend.example.com/api`). Do not
use `localhost` for a deployed frontend: in a visitor's browser, `localhost`
refers to that visitor's own device. Deploy the backend to a hosting service or
make your development server reachable through a secure tunnel. After changing
a Vercel environment variable, redeploy the frontend for the new value to take
effect.

Start the frontend:

```powershell
npm run dev
```

Vite prints the local frontend URL when it starts. Keep both development
terminals running while using the app.

## API overview

All API paths below are relative to `/api`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/tasks` | List tasks, newest first. |
| `POST` | `/tasks` | Create a task. Requires a non-empty `title`. |
| `GET` | `/tasks/:id` | Get a task by its MongoDB ID. |
| `PUT`, `PATCH` | `/tasks/:id` | Update one or more task fields. |
| `DELETE` | `/tasks/:id` | Delete a task. |
| `POST` | `/ai/plan-task` | Generate a plan from a non-empty `description`. |

For compatibility, the backend also accepts the singular task paths
`/task/:id` for get, update, and delete operations.

Task fields include `title`, `description`, `status`, and optional `dueDate`.
Valid statuses are `pending`, `in-progress`, and `completed`. The AI planning
endpoint returns a plan containing `summary`, `priority`, `estimatedHours`, and
`steps`.

Example task request:

```json
{
  "title": "Prepare project presentation",
  "description": "Create slides and rehearse the demo",
  "status": "pending",
  "dueDate": "2026-11-15T17:00:00.000Z"
}
```

Example AI request:

```json
{
  "description": "Build a portfolio website in one week"
}
```

## Useful commands

Run these from the appropriate application directory:

| Directory | Command | Purpose |
| --- | --- | --- |
| `server/` | `npm run dev` | Start the backend with Nodemon. |
| `server/` | `npm start` | Start the backend normally. |
| `server/` | `npm test` | Run backend tests. |
| `client/` | `npm run dev` | Start the Vite development server. |
| `client/` | `npm run build` | Create a production frontend build. |
| `client/` | `npm run preview` | Preview the production build locally. |
| `client/` | `npm run lint` | Run Oxlint. |

## Contributing

Contributions are welcome. A good starting point is to choose a focused
improvement, keep API validation and frontend behavior in sync, and add or
update tests for changed behavior. Avoid committing credentials or generated
dependency/build directories.

## Current limitations

- The application does not currently provide user accounts or authentication.
  Do not expose a deployment publicly with private task data until access
  control is added.
- AI planning depends on OpenRouter availability, model access, and account
  credits. Keep the OpenRouter key in the backend environment only.
- Tasks are stored in the configured MongoDB database; the app currently has no
  per-user task separation.
