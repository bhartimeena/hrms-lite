const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ message: "Already marked or invalid" });
  }
};

exports.getAttendance = async (req, res) => {
  const { date } = req.query;

  const filter = { employeeId: req.params.employeeId };
  if (date) filter.date = date;

  const records = await Attendance.find(filter);
  res.json(records);
};