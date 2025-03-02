# Node Backend API

This project is a Node.js backend API that provides authentication and CRUD operations for users, employees, and posts. It is built using Express and MongoDB, and it supports role-based access control for different user roles: User, Admin, and Manager.

## Features

- User authentication (login, signup, logout)
- Role-based access control
- CRUD operations for:
  - Users
  - Posts
- File upload support for profile photos
- CORS enabled for cross-origin requests

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/microsoft/vscode-remote-try-node.git
   cd node-backend-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string and any other necessary environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Usage

1. Start the server:
   ```
   npm run dev
   ```

2. The API will be running on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Log in a user
- **POST** `/api/auth/logout` - Log out a user

### Users

- **GET** `/api/users` - Get all users (Admin only)
- **GET** `/api/users/:id` - Get a user by ID (Admin and Manager)
- **POST** `/api/users` - Create a new user (Admin only)
- **PUT** `/api/users/:id` - Update a user (Admin and Manager)
- **DELETE** `/api/users/:id` - Delete a user (Admin only)

### Posts

- **GET** `/api/posts` - Get all posts
- **GET** `/api/posts/:id` - Get a post by ID
- **POST** `/api/posts` - Create a new post
- **PUT** `/api/posts/:id` - Update a post
- **DELETE** `/api/posts/:id` - Delete a post

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.