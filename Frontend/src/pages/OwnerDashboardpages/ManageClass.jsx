import React, { useEffect, useState } from "react";
import {
  createClass,
  getAllClasses,
  assignMemberToClass,
  deleteClass,
} from "../../api/classApi";
import { getAllMembers, getAllTrainers } from "../../api/ownerapi";

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newClass, setNewClass] = useState({
    name: "",
    trainer: "",
    date: "",
    time: "",
    duration: "",
    description: "",
  });

  const [assignments, setAssignments] = useState({});

  /* ===================== FETCH ALL ===================== */
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [classRes, memberRes, trainerRes] = await Promise.all([
        getAllClasses(),
        getAllMembers(),
        getAllTrainers(),
      ]);

      // Ensure classes have populated trainer object
      setClasses(classRes.classes || []);
      setMembers(memberRes.members || []);
      setTrainers(trainerRes.trainers || []);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ===================== CREATE CLASS ===================== */
  const handleCreateClass = async (e) => {
    e.preventDefault();

    const { name, trainer, date, time, duration } = newClass;
    if (!name || !trainer || !date || !time || !duration) {
      alert("Fill all required fields");
      return;
    }

    try {
      await createClass(newClass);
      setNewClass({ name: "", trainer: "", date: "", time: "", duration: "", description: "" });
      fetchAll();
      alert("Class created");
    } catch (err) {
      alert(err.response?.data?.msg || "Class creation failed");
    }
  };

  /* ===================== ASSIGN MEMBER ===================== */
  const handleAssignMember = async (classId) => {
    const memberId = assignments[classId];
    if (!memberId) {
      alert("Select a member");
      return;
    }

    try {
      await assignMemberToClass(classId, memberId);
      fetchAll();
      alert("Member assigned to class");
    } catch (err) {
      console.error("Assign member error:", err);
      alert(err.response?.data?.msg || "Assignment failed");
    }
  };

  /* ===================== DELETE CLASS ===================== */
  const handleDeleteClass = async (id) => {
    if (!window.confirm("Delete this class?")) return;

    try {
      await deleteClass(id); // send id directly
      fetchAll();
    } catch (err) {
      alert("Delete failed");
      console.error("Deletion failed", err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading classes...</div>;

  /* ===================== UI ===================== */
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold">Owner – Manage Classes</h2>

      {/* CREATE CLASS FORM */}
      <form onSubmit={handleCreateClass} className="bg-white p-5 rounded shadow space-y-4">
        <h3 className="text-xl font-semibold">Create New Class</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Class Name" value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} className="border p-2 rounded" />

          <select value={newClass.trainer} onChange={(e) => setNewClass({ ...newClass, trainer: e.target.value })} className="border p-2 rounded">
            <option value="">Select Trainer</option>
            {trainers.map((t) => (
              <option key={t._id} value={t._id}>{t.name}</option>
            ))}
          </select>

          <input type="date" value={newClass.date} onChange={(e) => setNewClass({ ...newClass, date: e.target.value })} className="border p-2 rounded" />
          <input type="time" value={newClass.time} onChange={(e) => setNewClass({ ...newClass, time: e.target.value })} className="border p-2 rounded" />
          <input type="number" placeholder="Duration (mins)" value={newClass.duration} onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Description (optional)" value={newClass.description} onChange={(e) => setNewClass({ ...newClass, description: e.target.value })} className="border p-2 rounded" />
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Create Class</button>
      </form>

      {/* CLASS LIST */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Class</th>
              <th className="border p-3">Trainer</th>
              <th className="border p-3">Date & Time</th>
              <th className="border p-3">Members</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center">No classes created</td></tr>
            ) : (
              classes.map((c) => (
                <tr key={c._id}>
                  <td className="border p-3">{c.name}</td>
                  <td className="border p-3">{c.trainer?.name || "N/A"}</td>
                  <td className="border p-3">{new Date(c.dateTime).toLocaleString()}</td>
                  <td className="border p-3">{c.bookedMembers?.length || 0}</td>
                  <td className="border p-3 space-y-2">
                    <select className="border p-2 rounded w-full" value={assignments[c._id] || ""} onChange={(e) => setAssignments({ ...assignments, [c._id]: e.target.value })}>
                      <option value="">Assign Member</option>
                      {members.map((m) => (
                        <option key={m._id} value={m._id}>{m.name}</option>
                      ))}
                    </select>
                    <button onClick={() => handleAssignMember(c._id)} className="bg-green-600 text-white w-full py-1 rounded">Assign</button>
                    <button onClick={() => handleDeleteClass(c._id)} className="bg-red-500 text-white w-full py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
