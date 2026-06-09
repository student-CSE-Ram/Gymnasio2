import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PlanCard({
  plan,
  onPurchase,
  onEdit,
  onDelete,
  isAdmin,
  disabled,
}) {
  return (
    <div className="bg-gradient-to-br from-fuchsia-100 to-fuchsia-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 ease-in-out flex flex-col relative">
     <div className="mb-6">

  <h2 className="text-3xl font-bold">
    {plan.name}
  </h2>

  <p className="text-5xl font-extrabold mt-3">
    ₹{plan.price}
  </p>

</div>
<div className="grid grid-cols-2 gap-3 mb-6">

  <div className="bg-white/60 rounded-xl p-3 text-center">

    <p className="text-xs text-gray-500 uppercase">
      Duration
    </p>

    <p className="font-bold text-lg">
      {plan.durationInMonths}
    </p>

    <p className="text-xs text-gray-500">
      Months
    </p>

  </div>

  <div className="bg-white/60 rounded-xl p-3 text-center">

    <p className="text-xs text-gray-500 uppercase">
      Check-ins
    </p>

    <p className="font-bold text-lg">

      {plan.dailyCheckinLimit === -1
        ? "∞"
        : plan.dailyCheckinLimit}

    </p>

    <p className="text-xs text-gray-500">
      Per Day
    </p>

  </div>

</div>

      <ul className="mb-6 space-y-3 py-4 text-gray-700 flex-1 border-t border-white/50">
        {plan.features.map((f, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* MEMBER ACTION */}
      {!isAdmin && (
        <button
          disabled={disabled}
          onClick={() => onPurchase(plan)}
          className={`px-6 py-3 rounded-lg w-full mt-auto text-white transition
            ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-emerald-500"
            }`}
        >
          Choose Plan
        </button>
      )}

      {/* ADMIN ACTIONS */}
      {isAdmin && (
        <>
          <button
            onClick={() => onEdit(plan._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-full mt-auto"
          >
            Edit Plan
          </button>

          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => onDelete(plan._id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
