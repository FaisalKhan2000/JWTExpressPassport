# JWTExpressPassport

JWTExpressPassport is a simple authentication system built with Express.js, Passport.js, and JWT (JSON Web Tokens). It provides a secure way to authenticate users using JWT tokens stored in cookies.

## Features

- User registration with hashed passwords
- User login with JWT token generation and cookie storage
- User logout with cookie deletion
- Protected routes with JWT token verification

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd JWTExpressPassport
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```plaintext
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and JWT secret.

## Usage

1. Start the server:

```bash
npm start
```

2. Use the following routes to interact with the authentication system:

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Log in with an existing user.
- `POST /api/v1/auth/logout`: Log out the current user.
- `GET /api/v1/auth/profile`: Access the user's profile (protected route).
