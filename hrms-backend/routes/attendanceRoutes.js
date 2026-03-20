const router = require("express").Router();
const {
  markAttendance,
  getAttendance
} = require("../Controllers/AttendanceController");

router.post("/", markAttendance);
router.get("/:employeeId", getAttendance);

module.exports = router;