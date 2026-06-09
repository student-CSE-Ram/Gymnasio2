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
  <div className="bg-white rounded-2xl shadow-md mt-6 overflow-hidden">

    <div className="px-6 py-4 border-b bg-gray-50">
      <h2 className="text-xl font-bold">
        Recent Payments
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Latest membership purchases
      </p>
    </div>

    <div className="overflow-x-auto">

      <table className="w-full min-w-[700px]">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left font-semibold">
              Member
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Plan
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Amount
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.map((payment) => (

            <tr
              key={payment.paymentId}
              className="
                border-t
                hover:bg-gray-50
                transition
              "
            >

              <td className="px-6 py-4 font-medium">
                {payment.member}
              </td>

              <td className="px-6 py-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {payment.plan}
                </span>
              </td>

              <td className="px-6 py-4">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  ₹{payment.amount}
                </span>

              </td>

              <td className="px-6 py-4 text-gray-600">
                {new Date(
                  payment.date
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);
}
