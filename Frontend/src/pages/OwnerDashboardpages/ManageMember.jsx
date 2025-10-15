import React, { useEffect, useState } from "react";
import {
  getAllMembers,
  createMember,
  deleteUser,
} from "../../api/ownerapi";

export default function ManageMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [filter, setFilter] = useState("");

  // Fetch all members
  // const fetchMembers = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getAllMembers();
  //     setMembers(res.members || []);
  //   } catch (err) {
  //     console.error("Error fetching members:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchMembers = async () =>{
    try {
      setLoading(true);

      const res = await getAllMembers();
      setMembers(res.members || [])
    } catch (error) {
      console.error("Error fetching memebrs",error);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle Add Member
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      if (!newMember.name || !newMember.email || !newMember.password) {
        alert("Please fill all fields");
        return;
      }

      await createMember(newMember);
      setNewMember({ name: "", email: "", password: "" });
      fetchMembers();
      alert("Member added successfully!");
    } catch (err) {
      console.error("Error adding member:", err);
      alert(err.response?.data?.msg || "Failed to add member");
    }
  };

  // Handle Delete Member
  const handleDelete = async (email) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await deleteUser({ email, role: "member" });
      setMembers((prev) => prev.filter((m) => m.email !== email));
      alert("Member deleted successfully!");
    } catch (err) {
      console.error("Error deleting member:", err);
      alert(err.response?.data?.msg || "Failed to delete member");
    }
  };

  // Filter Members
  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase()) ||
    m.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading members...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Members</h2>

      {/* Add Member Form */}
      <form
        onSubmit={handleAddMember}
        className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-3"
      >
        <input
          type="text"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className="border p-2 rounded flex-1 min-w-[180px]"
        />
        <input
          type="email"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) =>
            setNewMember({ ...newMember, email: e.target.value })
          }
          className="border p-2 rounded flex-1 min-w-[180px]"
        />
        <input
          type="password"
          placeholder="Password"
          value={newMember.password}
          onChange={(e) =>
            setNewMember({ ...newMember, password: e.target.value })
          }
          className="border p-2 rounded flex-1 min-w-[180px]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Member
        </button>
      </form>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search members..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map((m) => (
                <tr key={m._id} className="hover:bg-gray-50">
                  <td className="border p-3">{m.name}</td>
                  <td className="border p-3">{m.email}</td>
                  <td className="border p-3 capitalize">{m.role}</td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleDelete(m.email)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
