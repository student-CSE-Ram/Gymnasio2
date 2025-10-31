import React, { useState, useEffect } from "react";
import PlanCard from "../../components/Pricing/PlanCard";
import {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlanByName,
} from "../../api/planApi";

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
  });
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all plans (safe for both response formats)
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await getAllPlans();
      console.log("Fetched Plans Response:", res);

      // Handle both array and object formats safely
      const planData = Array.isArray(res) ? res : res?.plans;
      setPlans(planData || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Load on mount
  useEffect(() => {
    fetchPlans();
  }, []);

  // Delete plan by name
  const handleDelete = async (name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deletePlanByName(name);
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  // Start editing
  const handleEdit = (plan) => {
    setEditingPlan(plan.name);
    setEditForm({
      name: plan.name,
      price: plan.price,
      duration: plan.duration || "",
      features: plan.features?.join(", ") || "",
    });
  };

  // Save edited plan
  const handleSave = async () => {
    try {
      await updatePlan(editingPlan, {
        price: parseInt(editForm.price),
        duration: editForm.duration,
        features: editForm.features.split(",").map((f) => f.trim()),
      });
      setEditingPlan(null);
      fetchPlans();
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  // Create new plan
  const handleAddPlan = async () => {
    if (!newPlan.name || !newPlan.price || !newPlan.duration) {
      alert("Please enter plan name, price, and duration");
      return;
    }
    try {
      await createPlan({
        name: newPlan.name,
        price: parseInt(newPlan.price),
        duration: newPlan.duration,
        features: newPlan.features
          ? newPlan.features.split(",").map((f) => f.trim())
          : [],
      });
      setNewPlan({ name: "", price: "", duration: "", features: "" });
      fetchPlans();
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Membership Plans</h1>
      <p className="mb-6 text-gray-600">
        Here you can add, update, or remove plans for members.
      </p>

      {/* Add New Plan Section */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Add New Plan</h2>
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Plan Name"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 w-full mb-2"
          placeholder="Price"
          value={newPlan.price}
          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Duration (e.g. 1 month)"
          value={newPlan.duration}
          onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Features (comma separated)"
          value={newPlan.features}
          onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
        />
        <button
          onClick={handleAddPlan}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Plan
        </button>
      </div>

      {/* Edit Plan Section */}
      {editingPlan && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Edit Plan</h2>
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Plan Name"
            value={editForm.name}
            readOnly
          />
          <input
            type="number"
            className="border p-2 w-full mb-2"
            placeholder="Price"
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Duration"
            value={editForm.duration}
            onChange={(e) =>
              setEditForm({ ...editForm, duration: e.target.value })
            }
          />
          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Features (comma separated)"
            value={editForm.features}
            onChange={(e) =>
              setEditForm({ ...editForm, features: e.target.value })
            }
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingPlan(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Plans List */}
      {loading ? (
        <p>Loading plans...</p>
      ) : Array.isArray(plans) && plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id || plan.name}
              plan={plan}
              isAdmin={true}
              onEdit={() => handleEdit(plan)}
              onDelete={() => handleDelete(plan.name)}
            />
          ))}
        </div>
      ) : (
        <p>No plans found.</p>
      )}
    </div>
  );
}
