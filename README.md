# SQL-MERN Stack Project

This project is an API (MySQL, Express.js, Node.js) application with SQL and EJS integration. It provides a CRUD-based system for managing and displaying database records using a RESTful API.

## 🧩 Tech Stack

- **Frontend**: basic HTML/EJS
- **Backend**: Express.js (Node.js)
- **Database**: MySQL (using `mysql2` package)

## 🚀 Getting Started

### Prerequisites

- Node.js
- MySQL
- npm
- Express.js
- uuid
- @faker-js/faker
- method-override

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/leafycodes/express-rest-api-mysql.git
   cd express-rest-api-mysql
   ```

2. Install backend dependencies:
    ```bash
    cd express-rest-api-mysql
    npm install
    ```
3. Setup your MySQL database:
   - Create a database and table as expected by the code.
   - Update the credentials inside server/database using faker template provided in index.js.

4. Start the server and visit `http://localhost:8080/`

## API endpoints:

- `GET /users` — fetch all users
- `POST /users` — create a new user
- `PATCH /users/:id` — update username if the password is correct
- `DELETE /users/:id` — delete user if password is correct
