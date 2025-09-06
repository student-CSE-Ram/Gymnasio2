import React from "react";
import { CheckCircle, Clock } from "lucide-react";

export default function MyPlansPage() {
  const plans = [
    { id: 1, name: "Gold Plan", price: "₹2000", status: "Active", start: "Aug 1, 2025", end: "Oct 1, 2025" },
    { id: 2, name: "Silver Plan", price: "₹1500", status: "Expired", start: "Jun 1, 2025", end: "Jul 31, 2025" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Plans</h1>
      <p className="text-gray-500">View your current and past membership plans</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-600">Price: {plan.price}</p>
            <p className="text-gray-600">
              Duration: {plan.start} → {plan.end}
            </p>
            <p
              className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
                plan.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
              }`}
            >
              {plan.status === "Active" ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              {plan.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
