import React from "react";
import PlanCard from "./PlanCard";

export default function PriceCards() {
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: 500,
      features: [
        "Access to gym facilities",
        "2 group classes per week",
        "1 personal training session",
        "Basic support",
      ],
    },
    {
      id: 2,
      name: "Half Yearly Plan",
      price: 2500,
      features: [
        "Access to gym facilities",
        "Priority support",
        "3 group classes per week",
        "6 personal training sessions",
        "Advance support",
      ],
    },
    {
      id: 3,
      name: "Annual Plan",
      price: 5000,
      features: [
        "Access to gym facilities",
        "5 group classes per week",
        "Free fitness assessment",
        "Nutrition consultation",
        "12 personal training sessions",
        "Advance support",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} isAdmin={false} />
        ))}
      </div>
    </div>
  );
}



