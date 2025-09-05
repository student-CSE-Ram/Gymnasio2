import React, { useState } from "react";

export default function ManageMembers() {
  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", plan: "Gold", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9123456780", plan: "Silver", status: "Expired" },
  ]);

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [newMember, setNewMember] = useState({ name: "", email: "", phone: "", plan: "Gold", status: "Active" });
  const [isAdding, setIsAdding] = useState(false);

  const [editingMember, setEditingMember] = useState(null); 

  // Filtered members
  const filteredMembers = members.filter((m) => {
    return (
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.phone.includes(search)) &&
      (planFilter === "" || m.plan === planFilter) &&
      (statusFilter === "" || m.status === statusFilter)
    );
  });

  // Add Member
  const handleAddMember = () => {
    setMembers([...members, { ...newMember, id: Date.now() }]);
    setNewMember({ name: "", email: "", phone: "", plan: "Gold", status: "Active" });
    setIsAdding(false);
  };

  // Delete Member
  const handleDelete = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleEdit = (member) => {
    setEditingMember(member); // set the member we want to edit
  };

  // Save Edited Member
  const handleSaveEdit = () => {
    setMembers(members.map((m) => (m.id === editingMember.id ? editingMember : m)));
    setEditingMember(null); // close modal
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Members</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          + Add New Member
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-1/3"
        />
        <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="">All Plans</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Platinum">Platinum</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* Add Member Modal */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Member</h2>
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <select
              value={newMember.plan}
              onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            >
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
            </select>
            <select
              value={newMember.status}
              onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleAddMember} className="px-4 py-2 bg-amber-600 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Member</h2>
            <input
              type="text"
              placeholder="Name"
              value={editingMember.name}
              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={editingMember.email}
              onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={editingMember.phone}
              onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <select
              value={editingMember.plan}
              onChange={(e) => setEditingMember({ ...editingMember, plan: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            >
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
            </select>
            <select
              value={editingMember.status}
              onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setEditingMember(null)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-600 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{member.name}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.phone}</td>
                <td className="p-3">{member.plan}</td>
                <td className={`p-3 font-semibold ${member.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {member.status}
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => alert(JSON.stringify(member, null, 2))} className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button onClick={() => handleEdit(member)} className="text-green-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
