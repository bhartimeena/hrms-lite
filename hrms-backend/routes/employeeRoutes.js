const router = require("express").Router();
const {
  createEmployee,
  getEmployees,
  deleteEmployee
} = require("../Controllers/EmployeeControllers");

router.post("/", createEmployee);
router.get("/", getEmployees);
router.delete("/:id", deleteEmployee);

module.exports = router;