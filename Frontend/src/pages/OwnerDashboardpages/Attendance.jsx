import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getAllTrainers,
} from "../../api/ownerapi";
import {
  markTrainerAttendance,
  getTrainerAttendance,
} from "../../api/attendanceApi";

export default function OwnerTrainerAttendance() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  /* ---------------- FETCH TRAINERS ---------------- */
  useEffect(() => {
    const fetchTrainers = async () => {
      const res = await getAllTrainers();
      setTrainers(res.trainers || []);
    };
    fetchTrainers();
  }, []);

  /* ---------------- FETCH ATTENDANCE ---------------- */
/* ---------------- FETCH ATTENDANCE ---------------- */
useEffect(() => {
  if (!selectedTrainer) return;

  const fetchAttendance = async () => {
    const res = await getTrainerAttendance(selectedTrainer._id);
    setAttendance(res.attendance || []);
  };

  fetchAttendance();
}, [selectedTrainer]);


  /* ---------------- MARK ATTENDANCE ---------------- */
const handleMarkAttendance = async () => {
  if (!selectedTrainer) return;

  await markTrainerAttendance(selectedTrainer._id);

  const res = await getTrainerAttendance(selectedTrainer._id);
  setAttendance(res.attendance || []);

  alert("Attendance marked");
};


  /* ---------------- HELPERS ---------------- */
  const formatDate = (date) =>
    date.toISOString().split("T")[0];

const attendanceMap = Array.isArray(attendance)
  ? attendance.reduce((acc, record) => {
      acc[record.date] = record.status;
      return acc;
    }, {})
  : {};


  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      {/* TRAINER LIST */}
      <div className="col-span-1 bg-white shadow rounded p-4">
        <h3 className="font-bold mb-4">Trainers</h3>
        <ul className="space-y-2">
          {trainers.map((t) => (
            <li
              key={t._id}
              onClick={() => setSelectedTrainer(t)}
              className={`p-2 rounded cursor-pointer ${
                selectedTrainer?._id === t._id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              {t.name}
            </li>
          ))}
        </ul>
      </div>

      {/* CALENDAR */}
      <div className="col-span-3 bg-white shadow rounded p-6">
        {!selectedTrainer ? (
          <p className="text-center text-gray-500">
            Select a trainer to manage attendance
          </p>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              Attendance – {selectedTrainer.name}
            </h2>

            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tileClassName={({ date }) => {
                const d = formatDate(date);
                if (attendanceMap[d] === "present")
                  return "bg-green-300";
                if (attendanceMap[d] === "absent")
                  return "bg-red-300";
              }}
            />

            <button
              onClick={handleMarkAttendance}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Mark Present for {formatDate(selectedDate)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
