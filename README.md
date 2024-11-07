# Rapyd Integration Project

This project aims to integrate Rapyd payment services into a web application. It includes a Node.js server using Express.js, a MySQL database for storing user and payment information, and Rapyd API for payment processing.

## Project Structure

The project is structured as follows:

- `index.js`: The entry point of the application, responsible for starting the server.
- `server.ts`: The server implementation using Express.js and TypeScript.
- `scripts/setupDatabase.ts`: A script to set up the database schema.
- `migrations/01_initial_schema.sql`: The initial database schema migration file.
- `package.json`: The project's package file, listing dependencies and scripts.
- `.gitignore`: A file specifying files and directories to ignore in the Git repository.
- `.env`: Environment variables for the project, including database credentials and Rapyd API keys.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/rapyd-integration-project.git`
2. Install dependencies: `npm install`
3. Set up the database: `npm run db:setup`
4. Start the server: `npm run dev`

## Technologies Used

- Node.js: The server-side runtime environment.
- Express.js: A web framework for building web applications.
- TypeScript: A superset of JavaScript for static typing and better code maintainability.
- MySQL: A relational database management system for storing data.
- Rapyd: A payment service provider for payment processing.
