# Todo List Application

This repository contains a minimal Todo List application example consisting of
both a backend (Node/Express + SQLite) and a frontend (React + Vite).

Due to the Codex execution environment lacking internet access, the repository
includes only the project source files but not the installed dependencies.
To run the project locally you need to install the dependencies with `npm` or
`yarn` on a machine with internet access.

## Running the application

1. Install Node.js (v18+ recommended).
2. Navigate to the `backend` directory and run `npm install` then `npm start` to
   start the backend server on port `3001`.
3. Navigate to the `frontend` directory and run `npm install` then
   `npm run dev` to start the Vite development server on port `5173`.

## Features

- Add, edit, delete and mark todos as complete
- Todos include text and a scheduled date/time
- Data is persisted in a SQLite database
- API endpoints available under `/todos`

This skeleton code is provided to illustrate how the project can be organised.
Actual package installation requires network access.
