import React from "react";

export default function MyPaymentsPage() {
  const payments = [
    { id: 1, date: "Aug 1, 2025", plan: "Gold Plan", amount: "₹2000", status: "Paid" },
    { id: 2, date: "Jul 1, 2025", plan: "Silver Plan", amount: "₹1500", status: "Paid" },
    { id: 3, date: "Jun 1, 2025", plan: "Silver Plan", amount: "₹1500", status: "Paid" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Payments</h1>
      <p className="text-gray-500">Track your payment history and upcoming dues</p>

      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Date</th>
              <th className="py-3">Plan</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{p.date}</td>
                <td className="py-3">{p.plan}</td>
                <td className="py-3">{p.amount}</td>
                <td
                  className={`py-3 font-medium ${
                    p.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
