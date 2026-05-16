import { useEffect, useState } from "react";
import { getAllPlans, getMyPlans } from "../../api/planApi";
import { createOrder, capturePayment } from "../../api/paymentApi";
import { createMembership } from "../../api/membershipApi";
import PlanCard from "../../components/Pricing/PlanCard";

export default function AllPlans() {

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [payingPlanId, setPayingPlanId] = useState(null);

  // MEMBERSHIP STATE
  const [hasActiveMembership, setHasActiveMembership] = useState(false);

  const [membershipMessage, setMembershipMessage] = useState("");

  useEffect(() => {
    fetchPlans();
    checkMembershipStatus();
  }, []);

  // FETCH ALL AVAILABLE PLANS
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

  // CHECK CURRENT USER MEMBERSHIP STATUS
  const checkMembershipStatus = async () => {

    try {

      const data = await getMyPlans();

      const myPlans = data.plans || [];

      // ACTIVE MEMBERSHIP
      const activePlan = myPlans.find(
        (plan) =>
          plan.status?.toLowerCase() === "active"
      );

      // CANCELLED MEMBERSHIP
      const cancelledPlan = myPlans.find(
        (plan) =>
          plan.status?.toLowerCase() === "cancelled"
      );

      // HANDLE CANCELLED
      if (cancelledPlan) {

        setHasActiveMembership(true);

        setMembershipMessage(
          "Your membership has been cancelled. Please contact the gym owner."
        );

        return;
      }

      // HANDLE ACTIVE
      if (activePlan) {

        setHasActiveMembership(true);

        setMembershipMessage(
          "You already have an active membership plan."
        );

        return;
      }

      // NO ACTIVE MEMBERSHIP
      setHasActiveMembership(false);

      setMembershipMessage("");

    } catch (error) {

      console.error("Failed to check membership status", error);
    }
  };

  // PURCHASE FLOW
  const handlePurchase = async (plan) => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      setPayingPlanId(plan._id);

      // CREATE PAYMENT ORDER
      const orderData = await createOrder(plan._id);

      // RAZORPAY CONFIG
      const options = {

        key: orderData.key,

        amount: orderData.amount,

        currency: orderData.currency,

        order_id: orderData.orderId,

        name: "Gymnasio",

        description: plan.name,

        handler: async function (response) {

          try {

            // CAPTURE PAYMENT
            await capturePayment({
              orderId: orderData.orderId,
              paymentId: response.razorpay_payment_id,
            });

            // CREATE MEMBERSHIP
            await createMembership({
              userId: user.id,
              planId: plan._id,
            });

            alert("Payment successful! Membership activated.");

            // REFRESH MEMBERSHIP STATUS
            checkMembershipStatus();

          } catch (err) {

            console.error(err.response?.data || err);

            alert(
              "Payment succeeded but membership activation failed"
            );

          } finally {

            setPayingPlanId(null);
          }
        },

        theme: {
          color: "#000000",
        },
      };

      // OPEN RAZORPAY
      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.error("Payment initiation failed", error);

      // HANDLE ACTIVE MEMBERSHIP ERROR
      if (error.response?.status === 400) {

        alert(
          error.response?.data?.msg ||
          "You already have an active membership."
        );

      } else {

        alert("Unable to start payment");
      }

      setPayingPlanId(null);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="p-6">
        <p>Loading plans...</p>
      </div>
    );
  }

  // EMPTY STATE
  if (!plans.length) {
    return (
      <div className="p-6">
        <p>No plans available</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* PAGE HEADER */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-900">
          Membership Plans
        </h2>

        <p className="text-gray-500 mt-2">
          Choose the best membership plan for your fitness journey.
        </p>
      </div>

      {/* MEMBERSHIP STATUS MESSAGE */}
      {hasActiveMembership && (
        <div className="mb-6 bg-yellow-100 border border-yellow-300 text-yellow-800 px-5 py-4 rounded-2xl">
          {membershipMessage}
        </div>
      )}

      {/* PLANS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {plans.map((plan) => (

          <div
            key={plan._id}
            className={`transition ${
              hasActiveMembership
                ? "opacity-70"
                : ""
            }`}
          >
            <PlanCard
              plan={plan}
              onPurchase={handlePurchase}

              // DISABLE IF:
              // payment processing
              // OR active membership exists
              disabled={
                payingPlanId === plan._id ||
                hasActiveMembership
              }

              isAdmin={false}

              // OPTIONAL BUTTON TEXT SUPPORT
              buttonText={
                hasActiveMembership
                  ? "Membership Active"
                  : payingPlanId === plan._id
                  ? "Processing..."
                  : "Choose Plan"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}