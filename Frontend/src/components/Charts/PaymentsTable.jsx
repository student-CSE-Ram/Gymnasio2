import { useEffect, useState } from "react";
import { getRecentPayments } from "../../api/ownerDashboardApi";
export default function RecentPaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

const fetchPayments = async () => {
  try {
    const data = await getRecentPayments(); 
    setPayments(data.payments || []);
  } catch (err) {
    console.error("Failed to fetch payments", err);
  } finally {
    setLoading(false);
  }
};


  if (loading) return <p>Loading recent payments...</p>;
  if (!payments.length) return <p>No payments yet.</p>;

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
            <tr key={payment.paymentId} className="border-t">
              <td className="p-2">{payment.member}</td>
              <td className="p-2">{payment.plan}</td>
              <td className="p-2">{payment.amount}</td>
              <td className="p-2">{new Date(payment.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
