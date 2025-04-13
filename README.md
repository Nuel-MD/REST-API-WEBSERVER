# Student Management API

A RESTful API for managing student records built with Node.js, TypeScript, Express, and MongoDB.

## Features

- Create new student records
- Retrieve all students
- Get student details by ID
- Update student information
- Delete student records
- Data persistence with MongoDB
- Type safety with TypeScript

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/student-api
```

## Running the Application

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm run build
npm start
```

## API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | `/api/students`     | Create a new student |
| GET    | `/api/students`     | Get all students     |
| GET    | `/api/students/:id` | Get a student by ID  |
| PUT    | `/api/students/:id` | Update a student     |
| DELETE | `/api/students/:id` | Delete a student     |

### Request Body Format

For POST and PUT requests:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science",
  "grade": 85
}
```

## Project Structure

```
src/
├── app.ts              # Application entry point
├── config/
│   └── config.ts       # Configuration management
├── controllers/
│   └── studentController.ts  # Request handlers
├── models/
│   └── student.ts      # Database schema
└── routes/
    └── studentRoutes.ts  # API routes
```

## Development

### TypeScript Compilation

The project uses TypeScript. The `tsconfig.json` is configured for Node.js development.

### Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string

## Error Handling

The API includes comprehensive error handling:

- 400: Bad Request
- 404: Resource Not Found
- 500: Server Error

## License

MIT License
