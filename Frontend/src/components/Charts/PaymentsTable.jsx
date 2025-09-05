// components/tables/RecentPaymentsTable.jsx
const payments = [
    { id: 1, member: "John Doe", plan: "Premium", amount: "$50", date: "2025-09-01" },
    { id: 2, member: "Jane Smith", plan: "Basic", amount: "$20", date: "2025-09-02" },
    { id: 3, member: "Mike Johnson", plan: "Standard", amount: "$35", date: "2025-09-03" },
  ];
  
  export default function RecentPaymentsTable() {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-bold mb-4">Recent Payments</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Member</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="p-2">{payment.member}</td>
                <td className="p-2">{payment.plan}</td>
                <td className="p-2">{payment.amount}</td>
                <td className="p-2">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  