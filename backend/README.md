# Employee Management System - Backend API

A modern, production-ready REST API for Employee Management System built with Express.js and MongoDB.

## 🚀 Features

- RESTful API endpoints for employee CRUD operations
- MongoDB integration for data persistence
- CORS enabled for cross-origin requests
- Comprehensive error handling
- Input validation
- Clean code structure
- MongoDB unique constraints for Employee ID

## 🛠️ Tech Stack

- **Runtime** - Node.js
- **Framework** - Express.js 4.18
- **Database** - MongoDB 7.0+
- **Validation** - Express middleware

## 📋 Prerequisites

- Node.js 14+
- npm or yarn
- MongoDB 4.4+ (running locally or remote)

## 🚀 Getting Started

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure MongoDB**
   - Ensure MongoDB is running on `mongodb://127.0.0.1:27017`
    - Copy `.env.example` to `.env` and update `MONGO_URI` if needed

3. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Development Mode

```bash
npm run dev
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Add Employee
- **Method:** POST
- **Endpoint:** `/add-employee`
- **Request Body:**
  ```json
  {
    "EmployeeName": "John Doe",
    "EmployeeID": "EMP-001",
    "Designation": "Senior Developer",
    "Department": "Engineering",
    "JoiningDate": "2024-06-01"
  }
  ```
- **Response:** 201 Created
  ```json
  {
    "message": "Employee Added Successfully",
    "employee": { ... }
  }
  ```
- **Error Responses:**
  - 400: Missing required fields
  - 409: Employee ID already exists
  - 500: Server error

#### 2. Get All Employees
- **Method:** GET
- **Endpoint:** `/employees`
- **Response:** 200 OK
  ```json
  [
    {
      "_id": "...",
      "EmployeeName": "John Doe",
      "EmployeeID": "EMP-001",
      "Designation": "Senior Developer",
      "Department": "Engineering",
      "JoiningDate": "2024-06-01",
      "CreatedAt": "2024-01-15T..."
    }
  ]
  ```
- **Error Response:** 500 Server error

#### 3. Search Employee by ID
- **Method:** GET
- **Endpoint:** `/search-employee/:id`
- **URL Parameters:** `id` - Employee ID
- **Example:** `/search-employee/EMP-001`
- **Response:** 200 OK
  ```json
  {
    "_id": "...",
    "EmployeeName": "John Doe",
    "EmployeeID": "EMP-001",
    "Designation": "Senior Developer",
    "Department": "Engineering",
    "JoiningDate": "2024-06-01",
    "CreatedAt": "2024-01-15T..."
  }
  ```
- **Error Responses:**
  - 404: Employee not found
  - 500: Server error

#### 4. Update Employee Designation
- **Method:** PUT
- **Endpoint:** `/update-employee/:id`
- **URL Parameters:** `id` - Employee ID
- **Request Body:**
  ```json
  {
    "Designation": "Lead Developer"
  }
  ```
- **Response:** 200 OK
  ```json
  {
    "message": "Designation Updated Successfully",
    "employee": { ... }
  }
  ```
- **Error Responses:**
  - 400: Designation not provided
  - 404: Employee not found
  - 500: Server error

#### 5. Delete Employee
- **Method:** DELETE
- **Endpoint:** `/delete-employee/:id`
- **URL Parameters:** `id` - Employee ID
- **Example:** `/delete-employee/EMP-001`
- **Response:** 200 OK
  ```json
  {
    "message": "Employee Deleted Successfully"
  }
  ```
- **Error Responses:**
  - 404: Employee not found
  - 500: Server error

#### 6. Health Check
- **Method:** GET
- **Endpoint:** `/health`
- **Response:** 200 OK
  ```json
  {
    "status": "Server is running"
  }
  ```

## 🔧 Configuration

### MongoDB Connection

Update in `server.js`:
```javascript
mongoose.connect("mongodb://127.0.0.1:27017/Employees")
```

### Server Port

Set via environment variable or default to 5000:
```bash
PORT=8000 npm start
```

## 📊 Database Schema

### Employee Collection

```javascript
{
  _id: ObjectId,
  EmployeeName: String (required, trimmed),
  EmployeeID: String (required, unique, trimmed),
  Designation: String (required, trimmed),
  Department: String (required, trimmed),
  JoiningDate: String (required),
  CreatedAt: Date (default: current date)
}
```

## 🔒 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Missing or invalid required fields
- **404 Not Found** - Resource not found
- **409 Conflict** - Duplicate Employee ID
- **500 Internal Server Error** - Server-side errors

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

## 🧪 Testing with cURL

### Add Employee
```bash
curl -X POST http://localhost:5000/add-employee \
  -H "Content-Type: application/json" \
  -d '{
    "EmployeeName": "John Doe",
    "EmployeeID": "EMP-001",
    "Designation": "Developer",
    "Department": "IT",
    "JoiningDate": "2024-06-01"
  }'
```

### Get All Employees
```bash
curl http://localhost:5000/employees
```

### Search Employee
```bash
curl http://localhost:5000/search-employee/EMP-001
```

### Update Employee
```bash
curl -X PUT http://localhost:5000/update-employee/EMP-001 \
  -H "Content-Type: application/json" \
  -d '{"Designation": "Senior Developer"}'
```

### Delete Employee
```bash
curl -X DELETE http://localhost:5000/delete-employee/EMP-001
```

## 📁 Project Structure

```
backend/
├── server.js           # Main server file with all routes
├── package.json        # Dependencies and scripts
├── README.md           # This file
└── node_modules/       # Dependencies (not in repo)
```

## 🚀 Deployment

### Heroku
1. Create Heroku app
2. Set MongoDB connection environment variable
3. Deploy:
   ```bash
   git push heroku main
   ```

### Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t employee-api .
docker run -p 5000:5000 employee-api
```

## 📈 Performance Considerations

- Database indexes on frequently queried fields (EmployeeID)
- Pagination for large datasets (can be added)
- Caching strategies (can be implemented with Redis)
- Query optimization for large employee lists

## 🔐 Security Recommendations

For production:
1. Add authentication (JWT tokens)
2. Implement rate limiting
3. Add input sanitization
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Add request validation schemas
7. Implement logging and monitoring

## 🐛 Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running:
```bash
# On Windows
mongod

# On Mac
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change port or kill process:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Duplicate Key Error
```
MongoError: E11000 duplicate key error
```
**Solution:** Use unique Employee IDs or drop and recreate collection

## 📞 Support

For issues or questions:
1. Check MongoDB connection
2. Review error messages in console
3. Verify request format
4. Check CORS settings

## 📝 License

MIT License - feel free to use in your projects

---

**Built with ❤️ for modern web applications**
