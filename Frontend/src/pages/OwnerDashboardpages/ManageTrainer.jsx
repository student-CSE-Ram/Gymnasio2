// src/pages/Owner/ManageTrainer.jsx
import React, { useEffect, useState } from "react";
import { getAllTrainers, createTrainer, deleteUser } from "../../api/ownerapi";
import { toast } from "react-hot-toast";

export default function ManageTrainer() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    password: "",
  });

  // Fetch all trainers
  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const res = await getAllTrainers();
      setTrainers(res.trainers || []);
    } catch (error) {
      toast.error("Failed to fetch trainers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add new trainer
  const handleAddTrainer = async () => {
    if (!newTrainer.name || !newTrainer.email || !newTrainer.phone || !newTrainer.password) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await createTrainer(newTrainer);
      toast.success("Trainer created successfully!");
      setIsAdding(false);
      setNewTrainer({ name: "", email: "", phone: "", specialization: "", password: "" });
      fetchTrainers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create trainer");
      console.error(error);
    }
  };

  // Delete trainer
  const handleDeleteTrainer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;
    try {
      await deleteUser({ email, role:"trainer" });
      toast.success("Trainer deleted successfully");
      fetchTrainers();
    } catch (error) {
      toast.error("Failed to delete trainer");
      console.error(error);
    }
  };

  // Filter trainers (search by anything)
  const filteredTrainers = trainers.filter((trainer) =>
    Object.values(trainer)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Trainers</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          + Add Trainer
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search trainers..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded-lg px-3 py-2 mb-6 w-1/3"
      />

      {/* Trainers Table */}
      {loading ? (
        <p>Loading trainers...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.length > 0 ? (
                filteredTrainers.map((trainer) => (
                  <tr key={trainer._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{trainer.name}</td>
                    <td className="p-3">{trainer.email}</td>
                    <td className="p-3">{trainer.phone}</td>
                    <td className="p-3">{trainer.specialization}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleDeleteTrainer(trainer._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center" colSpan="5">
                    No trainers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Trainer Modal */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Trainer</h2>
            <input
              type="text"
              placeholder="Name"
              value={newTrainer.name}
              onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
              className="border w-full p-2 mb-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newTrainer.email}
              onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
              className="border w-full p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newTrainer.phone}
              onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })}
              className="border w-full p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Specialization"
              value={newTrainer.specialization}
              onChange={(e) =>
                setNewTrainer({ ...newTrainer, specialization: e.target.value })
              }
              className="border w-full p-2 mb-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={newTrainer.password}
              onChange={(e) => setNewTrainer({ ...newTrainer, password: e.target.value })}
              className="border w-full p-2 mb-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={handleAddTrainer}
                className="px-4 py-2 bg-amber-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
