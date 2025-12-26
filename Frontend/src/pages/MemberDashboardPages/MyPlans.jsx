import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { getMyPlans } from "../../api/planApi";

export default function MyPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPlans();
  }, []);

  const fetchMyPlans = async () => {
    try {
      const data = await getMyPlans();
      setPlans(data.plans || []);
    } catch (error) {
      console.error("Failed to fetch my plans", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading your plans...</p>;
  if (!plans.length) return <p>You have not purchased any plan yet.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Plans</h1>
      <p className="text-gray-500">
        View your current and past membership plans
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.paymentId}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-600">Price: {plan.price}</p>
            <p className="text-gray-600">
              Duration:{" "}
              {new Date(plan.start).toLocaleDateString()} →{" "}
              {new Date(plan.end).toLocaleDateString()}
            </p>

            <p
              className={`mt-3 inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
                plan.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {plan.status === "Active" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
              {plan.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
