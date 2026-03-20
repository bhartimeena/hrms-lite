import { useEffect, useState } from "react";
import { API } from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleSubmit = async () => {
    if (!form.employeeId || !form.fullName || !form.email || !form.department) {
      return alert("All fields required");
    }

    try {
      setLoading(true);
      await API.post("/employees", form);
      setForm({ employeeId: "", fullName: "", email: "", department: "" });
      fetchEmployees();
    } catch (err) {
      const message = err.response?.data?.message || "Error adding employee";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Employee Management
      </h2>

      {/* Form Card */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add Employee</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded-lg"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={e => setForm({ ...form, employeeId: e.target.value })}
          />

          <input
            className="border p-2 rounded-lg"
            placeholder="Full Name"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            className="border p-2 rounded-lg"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="border p-2 rounded-lg"
            placeholder="Department"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </div>

      {/* Employee Table */}
      <div className="bg-white shadow-md rounded-xl p-6">

        <h3 className="text-lg font-semibold mb-4">Employee List</h3>

        {employees.length === 0 ? (
          <p className="text-gray-400 text-center">
            No employees found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp._id} className="border-t">
                    <td className="p-3">{emp.employeeId}</td>
                    <td className="p-3">{emp.fullName}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.department}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}