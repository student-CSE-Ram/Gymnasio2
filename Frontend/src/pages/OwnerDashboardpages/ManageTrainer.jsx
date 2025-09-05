import React,{useState} from 'react'

export default function ManageTrainer() {
  const [Trainers, setTrainers] = useState([
      { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", specialization: "Yoga", status: "Active" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9123456780", specialization: "Muscles", status: "Expired" },
    ]);
  
    const [search, setSearch] = useState("");
    const [specializationFilter, setspecializationFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
  
    const [newTrainer, setNewTrainer] = useState({ name: "", email: "", phone: "", specialization: "Yoga", status: "Active" });
    const [isAdding, setIsAdding] = useState(false);
  
    const [editingTrainer, setEditingTrainer] = useState(null); 
  
    // Filtered Trainers
    const filteredTrainers = Trainers.filter((m) => {
      return (
        (m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.email.toLowerCase().includes(search.toLowerCase()) ||
          m.phone.includes(search)) &&
        (specializationFilter === "" || m.specialization === specializationFilter) &&
        (statusFilter === "" || m.status === statusFilter)
      );
    });
  
    // Add Trainer
    const handleAddTrainer = () => {
      setTrainers([...Trainers, { ...newTrainer, id: Date.now() }]);
      setNewTrainer({ name: "", email: "", phone: "", specialization: "Yoga", status: "Active" });
      setIsAdding(false);
    };
  
    // Delete Trainer
    const handleDelete = (id) => {
      setTrainers(Trainers.filter((t) => t.id !== id));
    };
  
    const handleEdit = (Trainer) => {
      setEditingTrainer(Trainer); // set the Trainer we want to edit
    };
  
    // Save Edited Trainer
    const handleSaveEdit = () => {
      setTrainers(Trainers.map((t) => (t.id === editingTrainer.id ? editingTrainer : t)));
      setEditingTrainer(null); // close modal
    };
  
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Trainers</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
          >
            + Add New Trainer
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
          <select value={specializationFilter} onChange={(e) => setspecializationFilter(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="">All Plans</option>
            <option value="Yoga">Yoga</option>
            <option value="Muscles">Muscles</option>
            <option value="Legs">Legs</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
  
        {/* Add Trainer Modal */}
        {isAdding && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add Trainer</h2>
              <input
                type="text"
                placeholder="Name"
                value={newTrainer.name}
                onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newTrainer.email}
                onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newTrainer.phone}
                onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <select
                value={newTrainer.specialization}
                onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              >
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
              </select>
              <select
                value={newTrainer.status}
                onChange={(e) => setNewTrainer({ ...newTrainer, status: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
  
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button onClick={handleAddTrainer} className="px-4 py-2 bg-amber-600 text-white rounded">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Edit Trainer Modal */}
        {editingTrainer && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit Trainer</h2>
              <input
                type="text"
                placeholder="Name"
                value={editingTrainer.name}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingTrainer.email}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, email: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={editingTrainer.phone}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, phone: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              />
              <select
                value={editingTrainer.specialization}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, specialization: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              >
                <option value="Yoga">Yoga</option>
                <option value="Muscles">Muscles</option>
                <option value="Legs">Legs</option>
              </select>
              <select
                value={editingTrainer.status}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, status: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
  
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setEditingTrainer(null)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-600 text-white rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Trainers Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.map((Trainer) => (
                <tr key={Trainer.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{Trainer.name}</td>
                  <td className="p-3">{Trainer.email}</td>
                  <td className="p-3">{Trainer.phone}</td>
                  <td className="p-3">{Trainer.specialization}</td>
                  <td className={`p-3 font-semibold ${Trainer.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {Trainer.status}
                  </td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => alert(JSON.stringify(Trainer, null, 2))} className="text-blue-600 hover:underline">
                      View
                    </button>
                    <button onClick={() => handleEdit(Trainer)} className="text-green-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(Trainer.id)} className="text-red-600 hover:underline">
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
