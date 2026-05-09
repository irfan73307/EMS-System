const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Employees")
  .then(() => console.log("✓ MongoDB Connected"))
  .catch(err => console.error("✗ MongoDB Connection Error:", err));

// Schema with validation
const EmployeeSchema = new mongoose.Schema({
  EmployeeName: {
    type: String,
    required: true,
    trim: true,
  },
  EmployeeID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Designation: {
    type: String,
    required: true,
    trim: true,
  },
  Department: {
    type: String,
    required: true,
    trim: true,
  },
  JoiningDate: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const Employee = mongoose.model("Employee", EmployeeSchema);

// ====================================
// API ROUTES
// ====================================

// ADD EMPLOYEE
app.post("/add-employee", async (req, res) => {
  try {
    const { EmployeeName, EmployeeID, Designation, Department, JoiningDate } = req.body;

    // Validation
    if (!EmployeeName || !EmployeeID || !Designation || !Department || !JoiningDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee({
      EmployeeName,
      EmployeeID,
      Designation,
      Department,
      JoiningDate,
    });

    await employee.save();
    res.status(201).json({ message: "Employee Added Successfully", employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Employee ID Already Exists" });
    }
    res.status(500).json({ message: error.message });
  }
});

// GET ALL EMPLOYEES
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ CreatedAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH EMPLOYEE BY ID
app.get("/search-employee/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ EmployeeID: req.params.id });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE EMPLOYEE DESIGNATION
app.put("/update-employee/:id", async (req, res) => {
  try {
    const { Designation } = req.body;

    if (!Designation) {
      return res.status(400).json({ message: "Designation is required" });
    }

    const employee = await Employee.findOneAndUpdate(
      { EmployeeID: req.params.id },
      { Designation },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    res.json({ message: "Designation Updated Successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE EMPLOYEE
app.delete("/delete-employee/:id", async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ EmployeeID: req.params.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    res.json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ====================================
// START SERVER
// ====================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server Running on http://localhost:${PORT}`);
  console.log("✓ API Endpoints Ready");
});