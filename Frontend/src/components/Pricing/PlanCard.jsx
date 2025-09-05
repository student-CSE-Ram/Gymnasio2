import React from "react";

export default function PlanCard({ plan, onEdit, onDelete, isAdmin }) {
  return (
    <div className="bg-green-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 ease-in-out flex flex-col relative">
      <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
      <p className="text-4xl font-semibold mb-4">
        ₹{plan.price}
        <span className="text-lg font-normal">/month</span>
      </p>
      <ul className="mb-6 space-y-4 py-6 text-gray-700 flex-1">
        {plan.features.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
      <button className="bg-amber-600 hover:bg-emerald-500 transition-transform duration-300 ease-in-out text-white px-6 py-3 rounded-lg w-full mt-auto">
        {isAdmin ? "Edit Plan" : "Choose Plan"}
      </button>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => onEdit(plan.id)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="px-2 py-1 bg-red-500 text-white rounded text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
