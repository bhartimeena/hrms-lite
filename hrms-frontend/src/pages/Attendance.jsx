import { useEffect, useState } from "react";
import { API } from "../api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employees
  useEffect(() => {
    API.get("/employees")
      .then(res => setEmployees(res.data))
      .catch(() => alert("Failed to load employees"));
  }, []);

  // Mark attendance
  const mark = async (status) => {
    if (!selected) return alert("Select employee first");

    try {
      setLoading(true);

      await API.post("/attendance", {
        employeeId: selected,
        date: new Date().toISOString().split("T")[0],
        status
      });

      await fetchRecords();
    } catch (err) {
      console.log(err.response?.data);

      const message = err.response?.data?.message || "Attendance already marked for today";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch attendance records
  const fetchRecords = async () => {
    if (!selected) return alert("Select employee first");

    try {
      const res = await API.get(`/attendance/${selected}`);
      setRecords(res.data);
    } catch {
      alert("Error fetching records");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Attendance Management
      </h2>

      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6">

        {/* Select Employee */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Select Employee
        </label>

        <select
          value={selected}
          onChange={e => {
            setSelected(e.target.value);
            setRecords([]); // reset records when switching
          }}
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Employee --</option>
          {employees.map(e => (
            <option key={e._id} value={e._id}>
              {e.fullName}
            </option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            disabled={!selected || loading}
            onClick={() => mark("Present")}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
          >
            Mark Present
          </button>

          <button
            disabled={!selected || loading}
            onClick={() => mark("Absent")}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
          >
            Mark Absent
          </button>

          <button
            disabled={!selected}
            onClick={fetchRecords}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
          >
            View Records
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-blue-500 mb-4">Processing...</p>
        )}

        {/* Already marked today */}
        {!loading && records.some(r => r.date === today) && (
          <p className="text-sm text-yellow-600 mb-3">
            Attendance already marked for today
          </p>
        )}

        {/* Empty State */}
        {!loading && records.length === 0 && selected && (
          <p className="text-gray-400 text-center">
            No attendance records found
          </p>
        )}

        {/* Table */}
        {records.length > 0 && (
          <div className="overflow-x-auto">
            <p className="text-sm text-gray-500 mb-2">
              Total Records: {records.length}
            </p>

            <table className="w-full border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {records.map(r => (
                  <tr key={r._id} className="border-t">
                    <td className="p-2">{r.date}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          r.status === "Present"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {r.status}
                      </span>
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