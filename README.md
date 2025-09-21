# Node.js Authentication System

A simple authentication system built with **Node.js** and **Express**, featuring password hashing and JSON Web Token (JWT) based authentication.

## Features
- User registration with secure password hashing using **bcrypt**
- User login with JWT token generation
- Basic API endpoints for authentication
- Lightweight and easy to extend

## Technologies Used
- Node.js
- Express.js
- Bcrypt
- JSON Web Token (JWT)

## Installation

1. Clone the repository:
 git clone https://github.com/VishalRRajput/webauthen.git

2.Install dependencies:
npm install


3.Start the server:
node index.js

4.API Endpoints
-Register
-POST /register
-Content-Type: application/json
{
  "username": "yourname",
  "password": "yourpassword"
}

-Login
POST /login
Content-Type: application/json
{
  "username": "yourname",
  "password": "yourpassword"
}

Protected Route
GET /protected
-Authorization: Bearer <your_token>

-Project Structure
├── index.js        # Main entry point
├── hash.js         # Password hashing logic
├── jwtauthen.js    # JWT authentication logic
├── casescenario.js # Example/test cases
├── package.json    # Project dependencies
└── README.md       # Project documentation
