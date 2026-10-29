# Task-Magement-system

## Project Structure

- `server/` — Backend application and its `package.json`.
- `client/` — Reserved for the frontend.
- `server/server.js` — Configures the Express app, API routes, middleware, and server startup.
- `server/routes/` — Defines task and AI API endpoints.
- `server/controllers/` — Handles incoming requests and sends responses.
- `server/services/` — Contains task and AI business logic.
- `server/models/` — Defines the MongoDB task model.
- `server/validators/` — Validates API request data.
- `server/middleware/` — Provides request validation and error handling.
- `server/config/` — Configures the database connection.
- `server/constants/` — Stores shared values such as HTTP status codes.
- `server/test/` — Contains API tests.

The backend's source folders, `.env`, `.env.example`, and npm manifests are all inside `server/`.
Run backend commands from that folder:

```sh
cd server
npm install
npm run dev
```
