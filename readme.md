# RESTful API with Node.js, Express, and PostgreSQL

This project implements a RESTful API using Node.js, Express, and PostgreSQL. It provides CRUD operations for managing user data in a PostgreSQL database.

## Requirements

- Node.js (v12 or higher)
- PostgreSQL

## Installation and Setup

1. Clone the repository:
2. Install the dependencies:
    npm install
3. Set up the PostgreSQL database:
    Create a new PostgreSQL database.
    Update the PostgreSQL connection details in the config.ts file to match your database configuration.
4. add JWT secret code in process env variable "jwtSecretKey"

## Usage

1. Start the server:
    npm start
    The server will start running on http://127.0.0.1:3000.

2. API Endpoints:

    1. POST /api/users/login: 
        - Description: Authenticate user and generate a JWT token.
        - Request Body: 
            {
                "email": "user@example.com",
                "password": "password123"
            }
        - Response:
            - 200 OK:
                {
                    "id": "<userID>",
                    "token": "<JWT Token>"
                }
            - 400 Bad Request: Invalid request body
            - 404 Not Found: User not found
            - 401 Unauthorized: Invalid password
            - 503 Internal Server Error

    2. POST /api/users/create: Create a new user.
    3. GET /api/users/:id: Get details of an existing user.
    4. PUT /api/users/:id: Update an existing user.
    5. DELETE /api/users/:id: Delete an existing user.

3. Make API requests:

    You can use tools like curl, Postman, or any other API testing tool to make requests to the API endpoints mentioned above.
    For protected routes (e.g., /api/users/:id), include the JWT token in the Authorization header of the request. You can obtain the token by making a successful login request.