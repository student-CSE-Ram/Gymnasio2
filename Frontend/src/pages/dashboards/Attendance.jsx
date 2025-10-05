import React, { useState } from "react";

const AttendancePage = ({ user }) => {
  // Mock data
  const mockClasses = [
    { id: "c1", name: "Yoga", dateTime: "2025-10-05T08:00:00" },
    { id: "c2", name: "Cardio", dateTime: "2025-10-06T10:00:00" },
  ];

  const mockMembers = [
    { id: "m1", name: "Alice" },
    { id: "m2", name: "Bob" },
    { id: "m3", name: "Charlie" },
  ];

  // State
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({}); // { memberId: status }

  // Mark attendance
  const markAttendance = (memberId, status) => {
    setAttendance((prev) => ({ ...prev, [memberId]: status }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Attendance Tracker</h1>

      {/* Select Class */}
      <label>
        Select Class:
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="">-- Choose Class --</option>
          {mockClasses.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} ({new Date(cls.dateTime).toLocaleString()})
            </option>
          ))}
        </select>
      </label>

      {selectedClass && (
        <div style={{ marginTop: "20px" }}>
          <h2>Members</h2>
          <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                {(user.role === "trainer" || user.role === "owner") && <th>Mark Attendance</th>}
              </tr>
            </thead>
            <tbody>
              {mockMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{attendance[member.id] || "Absent"}</td>
                  {(user.role === "trainer" || user.role === "owner") && (
                    <td>
                      <button onClick={() => markAttendance(member.id, "Present")}>Present</button>
                      <button onClick={() => markAttendance(member.id, "Absent")} style={{ marginLeft: "5px" }}>Absent</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {user.role === "member" && selectedClass && (
        <div style={{ marginTop: "20px" }}>
          <p>Your status: {attendance[user.id] || "Absent"}</p>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
