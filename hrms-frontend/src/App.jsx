import { useState } from "react";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [tab, setTab] = useState("employees");

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h1 className="text-xl font-bold mb-6 text-blue-600">
          HRMS Lite
        </h1>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setTab("employees")}
            className={`text-left px-4 py-2 rounded-lg ${
              tab === "employees"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            👨‍💼 Employees
          </button>

          <button
            onClick={() => setTab("attendance")}
            className={`text-left px-4 py-2 rounded-lg ${
              tab === "attendance"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            📅 Attendance
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Page Content */}
        <div className="bg-white rounded-xl shadow p-4">
          {tab === "employees" ? <Employees /> : <Attendance />}
        </div>

      </div>
    </div>
  );
}