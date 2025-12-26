import { useEffect, useState } from "react";
import { getAllPlans } from "../../api/planApi";
import { createOrder, capturePayment } from "../../api/paymentApi";
import PlanCard from "../../components/Pricing/PlanCard";

export default function AllPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingPlanId, setPayingPlanId] = useState(null); // track which plan is being paid

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getAllPlans();
      setPlans(data.plans || []);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (plan) => {
    try {
      setPayingPlanId(plan._id);

      // 1️⃣ Create Razorpay order on backend
      const orderData = await createOrder(plan._id);

      // 2️⃣ Configure Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Gymnasio",
        description: plan.name,
        handler: async function (response) {
          try {
            // 3️⃣ Capture payment in backend
            await capturePayment({
              orderId: orderData.orderId,
              paymentId: response.razorpay_payment_id,
            });

            alert("Payment successful! Your plan is now active.");

            // Optional: refresh plans or payments table
            fetchPlans();
          } catch (err) {
            console.error("Payment capture failed", err);
            alert("Payment done, but verification failed");
          } finally {
            setPayingPlanId(null);
          }
        },
        theme: { color: "#000000" },
      };

      // 4️⃣ Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Unable to start payment");
      setPayingPlanId(null);
    }
  };

  if (loading) return <p>Loading plans...</p>;
  if (!plans.length) return <p>No plans available</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            onPurchase={handlePurchase}
            disabled={payingPlanId === plan._id}
            isAdmin={false}
          />
        ))}
      </div>
    </div>
  );
}
