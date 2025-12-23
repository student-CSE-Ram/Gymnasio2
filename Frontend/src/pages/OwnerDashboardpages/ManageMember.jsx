import React, { useEffect, useState } from "react";
import {
  getAllMembers,
  getAllTrainers,
  createMember,
  deleteUser,
  assignMemberToTrainer,
} from "../../api/ownerapi";

export default function ManageMembers() {
  /* -------------------- STATE -------------------- */
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Temporary assignment selection
  const [assignments, setAssignments] = useState({});

  /* -------------------- FETCH DATA -------------------- */

  const fetchMembers = async () => {
    try {
      const res = await getAllMembers();
      setMembers(res.members || []);
    } catch (err) {
      console.error("Fetch members failed", err);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await getAllTrainers();
      setTrainers(res.trainers || []);
    } catch (err) {
      console.error("Fetch trainers failed", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchMembers(), fetchTrainers()]);
      setLoading(false);
    };
    init();
  }, []);

  /* -------------------- ADD MEMBER -------------------- */

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!newMember.name || !newMember.email || !newMember.password) {
      alert("All fields required");
      return;
    }

    try {
      await createMember(newMember);
      setNewMember({ name: "", email: "", password: "" });
      fetchMembers();
      alert("Member created");
    } catch (err) {
      alert(err.response?.data?.msg || "Create failed");
    }
  };

  /* -------------------- DELETE MEMBER -------------------- */

  const handleDelete = async (memberId) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await deleteUser(memberId);
      setMembers((prev) => prev.filter((m) => m._id !== memberId));
    } catch (err) {
      alert("Delete failed");
      console.log("Failed to assign",err);

    }
  };

  /* -------------------- ASSIGN TRAINER -------------------- */

 const handleAssignTrainer = async (memberId) => {
  const trainerId = assignments[memberId];

  if (!trainerId) {
    alert("Select a trainer");
    return;
  }

  try {
    await assignMemberToTrainer({
      userId: memberId,
      trainerUserId: trainerId,
    });

    fetchMembers();
    alert("Trainer assigned");
  } catch (err) {
    console.error("Assignment failed", err);
    alert(err.response?.data?.message || "Assignment failed");
  }
};


  /* -------------------- FILTER -------------------- */

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(filter.toLowerCase()) ||
      m.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Owner – Manage Members</h2>

      {/* ADD MEMBER */}
      <form
        onSubmit={handleAddMember}
        className="bg-white p-4 rounded shadow flex gap-3 flex-wrap"
      >
        <input
          type="text"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) =>
            setNewMember({ ...newMember, name: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />

        <input
          type="email"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) =>
            setNewMember({ ...newMember, email: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />

        <input
          type="password"
          placeholder="Password"
          value={newMember.password}
          onChange={(e) =>
            setNewMember({ ...newMember, password: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />

        <button className="bg-blue-600 text-white px-4 rounded">
          Add Member
        </button>
      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search members..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Assigned Trainer</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map((m) => (
                <tr key={m._id} className="hover:bg-gray-50">
                  <td className="border p-3">{m.name}</td>
                  <td className="border p-3">{m.email}</td>

                  {/* ASSIGN DROPDOWN */}
                  <td className="border p-3">
                    <select
                      value={
                        assignments[m._id] ||
                        m.assignedTrainer?._id ||
                        ""
                      }
                      onChange={(e) =>
                        setAssignments({
                          ...assignments,
                          [m._id]: e.target.value,
                        })
                      }
                      className="border p-2 rounded w-full"
                    >
                      <option value="">Unassigned</option>
                      {trainers.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* ACTIONS */}
                  <td className="border p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleAssignTrainer(m._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Assign
                    </button>

                    <button
                      onClick={() => handleDelete(m._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
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
