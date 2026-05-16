import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function MembershipTracker() {

  const [memberships, setMemberships] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  // FETCH MEMBERSHIPS
  const fetchMemberships = async () => {

    try {

      const res = await axiosInstance.get("/membership");

      setMemberships(res.data.membership || []);

    } catch (error) {

      console.error("Failed to fetch memberships", error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  // CANCEL MEMBERSHIP
  const handleCancelMembership = async (membershipId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this membership?"
    );

    if (!confirmCancel) return;

    try {

      await axiosInstance.put(
        `/membership/cancel/${membershipId}`
      );

      alert("Membership cancelled successfully");

      fetchMemberships();

    } catch (error) {

      console.error("Failed to cancel membership", error);

      alert("Unable to cancel membership");
    }
  };

  const handleReactivateMembership = async (membershipId) => {

  try {

    await axiosInstance.put(
      `/membership/reactivate/${membershipId}`
    );

    alert("Membership reactivated successfully");

    fetchMemberships();

  } catch (error) {

    console.error("Failed to reactivate membership", error);

    alert("Unable to reactivate membership");
  }
};

  // FILTER + SEARCH
  const filteredMemberships = useMemo(() => {

    return memberships.filter((membership) => {

      const matchesSearch =
        membership.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        membership.plan?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : membership.status === filter;

      return matchesSearch && matchesFilter;
    });

  }, [memberships, search, filter]);

  // STATUS STYLES
  const getStatusStyle = (status) => {

    switch (status) {

      case "active":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";

      case "expired":
        return "bg-rose-50 text-rose-600 border border-rose-100";

      case "cancelled":
        return "bg-yellow-50 text-yellow-700 border border-yellow-100";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading memberships...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Memberships
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Manage and track gym memberships.
            </p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 mb-6 shadow-sm flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                filter === "active"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("expired")}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                filter === "expired"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Expired
            </button>

            <button
              onClick={() => setFilter("cancelled")}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                filter === "cancelled"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search memberships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-80 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black transition-all"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[28px] border border-gray-200 shadow-sm overflow-hidden">

          {/* TABLE HEADER */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">

            <h2 className="text-lg font-semibold text-gray-900">
              Membership Records
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              All active, expired and cancelled memberships.
            </p>
          </div>

          {/* EMPTY STATE */}
          {filteredMemberships.length === 0 ? (

            <div className="p-10 text-center text-gray-500">
              No memberships found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-wider">

                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Member
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Plan
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Expiry
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredMemberships.map((membership) => (

                    <tr
                      key={membership._id}
                      className="border-b border-gray-100 hover:bg-gray-50/70 transition-all"
                    >

                      {/* MEMBER */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="h-11 w-11 rounded-2xl bg-black text-white flex items-center justify-center font-semibold">

                            {membership.user?.name?.charAt(0)}
                          </div>

                          <div>

                            <p className="font-semibold text-gray-900">
                              {membership.user?.name}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                              {membership.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* PLAN */}
                      <td className="px-6 py-5">

                        <div className="inline-flex px-4 py-2 rounded-2xl bg-gray-100 text-gray-700 text-sm font-medium">
                          {membership.plan?.name}
                        </div>
                      </td>

                      {/* EXPIRY */}
                      <td className="px-6 py-5 text-gray-700 font-medium">

                        {new Date(
                          membership.endDate
                        ).toLocaleDateString()}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-2 rounded-2xl text-xs font-semibold capitalize ${getStatusStyle(
                            membership.status
                          )}`}
                        >
                          {membership.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">

                        <div className="flex items-center justify-center gap-3">

                          {/* CANCEL */}
                          {membership.status === "active" && (
                            <button
                              onClick={() =>
                                handleCancelMembership(
                                  membership._id
                                )
                              }
                              className="px-4 py-2 rounded-2xl bg-red-500 text-white text-sm font-medium hover:scale-105 transition-all"
                            >
                              Cancel
                            </button>
                          )}

                          {/* RENEW */}
                          {membership.status === "expired" && (
                            <button
                              className="px-4 py-2 rounded-2xl bg-emerald-500 text-white text-sm font-medium hover:scale-105 transition-all"
                            >
                              Renew
                            </button>
                          )}

                          {/* CANCELLED */}
{membership.status === "cancelled" && (
  <button
    onClick={() =>
      handleReactivateMembership(
        membership._id
      )
    }
    className="px-4 py-2 rounded-2xl bg-blue-500 text-white text-sm font-medium hover:scale-105 transition-all"
  >
    Reactivate
  </button>
)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}