import React, { useState } from "react";
import PlanCard from "../../components/Pricing/PlanCard";

export default function ManagePlans() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      price: 500,
      features: ["Access to gym facilities", "2 group classes per week", "1 personal training session", "Basic support"],
    },
    {
      id: 2,
      name: "Half Yearly Plan",
      price: 2500,
      features: ["Access to gym facilities", "Priority support", "3 group classes per week", "6 personal training sessions", "Advance support"],
    },
    {
      id: 3,
      name: "Annual Plan",
      price: 5000,
      features: ["Access to gym facilities", "5 group classes per week", "Free fitness assessment", "Nutrition consultation", "12 personal training sessions", "Advance support"],
    },
  ]);

  const [editingPlan, setEditingPlan] = useState(null); // track plan being edited
  const [editForm, setEditForm] = useState({ name: "", price: "", features: "" });

  const handleDelete = (id) => setPlans(plans.filter((p) => p.id !== id));

  const handleEdit = (plan) => {
    setEditingPlan(plan.id);
    setEditForm({
      name: plan.name,
      price: plan.price,
      features: plan.features.join(", "), // turn array into comma string
    });
  };

  const handleSave = () => {
    setPlans(
      plans.map((p) =>
        p.id === editingPlan
          ? {
              ...p,
              name: editForm.name,
              price: parseInt(editForm.price),
              features: editForm.features.split(",").map((f) => f.trim()), // back to array
            }
          : p
      )
    );
    setEditingPlan(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Membership Plans</h1>
      <p className="mb-6 text-gray-600">Here you can add, update, or remove plans for members.</p>

      {/* If editing, show edit form */}
      {editingPlan && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Edit Plan</h2>
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Plan Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 w-full mb-2"
            placeholder="Price"
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
          />
          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Features (comma separated)"
            value={editForm.features}
            onChange={(e) => setEditForm({ ...editForm, features: e.target.value })}
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

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isAdmin={true}
            onEdit={() => handleEdit(plan)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
