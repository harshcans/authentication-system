# Authentication System - JWT + OTP Verification

A REST API authentication system built using Node.js, Express.js, MongoDB, JWT, and OTP verification.

The system provides user registration, email OTP verification, OTP resend, login, JWT access and refresh tokens, protected routes, and logout functionality.

## Features

- User registration
- Email and password validation
- Password hashing using bcrypt
- OTP generation and email verification
- OTP expiry after 5 minutes
- OTP resend with a maximum of 3 attempts
- JWT Access Token
- JWT Refresh Token
- Access Token expiry after 15 minutes
- Refresh Token expiry after 7 days
- Protected route using JWT middleware
- HTTP-only cookies for token storage
- Logout and refresh token revocation
- MongoDB database using Mongoose
- Environment variables for sensitive information

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Nodemailer
- cookie-parser
- dotenv

## Project Structure

```text
TASK-2 BACKEND/
│
├── server.js
├── db.js
├── userSchema.js
├── authController.js
├── authRoutes.js
├── authMiddleware.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
