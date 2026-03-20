const Employee = require("../models/Employee");

// ✅ CREATE EMPLOYEE
exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    // validation
    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee({
      employeeId,
      fullName,
      email,
      department
    });

    await employee.save();

    res.status(201).json(employee);
  } catch (err) {
    console.error("CREATE ERROR:", err);

    if (err.code === 11000) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    res.status(500).json({ message: "Server error" });
  }
};



// ✅ GET EMPLOYEES
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Error fetching employees" });
  }
};



// ✅ DELETE EMPLOYEE
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Error deleting employee" });
  }
};
