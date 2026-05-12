export default function MembershipTracker() {
  const memberships = [
    {
      id: 1,
      member: 'Ram Sharma',
      plan: 'Gold Plan',
      expiry: '2026-06-01',
      status: 'active',
    },
    {
      id: 2,
      member: 'Amit Singh',
      plan: 'Silver Plan',
      expiry: '2026-05-01',
      status: 'expired',
    },
    {
      id: 3,
      member: 'Priya Patel',
      plan: 'Premium Plan',
      expiry: '2026-06-10',
      status: 'active',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'expired':
        return 'bg-rose-50 text-rose-600 border border-rose-100';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Memberships
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Manage and track gym memberships.
            </p>
          </div>

          <button className="bg-black text-white px-5 py-3 rounded-2xl font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200">
            + Add Membership
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-5 mb-6 shadow-sm flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 rounded-2xl bg-black text-white font-medium text-sm shadow-sm">
              All
            </button>

            <button className="px-5 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-all">
              Active
            </button>

            <button className="px-5 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-all">
              Expired
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search memberships..."
              className="w-full sm:w-80 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-[28px] border border-gray-200 shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Membership Records
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                All active and expired memberships.
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Member</th>
                  <th className="px-6 py-4 text-left font-semibold">Plan</th>
                  <th className="px-6 py-4 text-left font-semibold">Expiry</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {memberships.map((membership) => (
                  <tr
                    key={membership.id}
                    className="border-b border-gray-100 hover:bg-gray-50/70 transition-all duration-200"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-black text-white flex items-center justify-center font-semibold shadow-sm">
                          {membership.member.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {membership.member}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Gym Member
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="inline-flex px-4 py-2 rounded-2xl bg-gray-100 text-gray-700 text-sm font-medium">
                        {membership.plan}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-700 font-medium">
                      {membership.expiry}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-2 rounded-2xl text-xs font-semibold capitalize ${getStatusStyle(
                          membership.status
                        )}`}
                      >
                        {membership.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button className="px-4 py-2 rounded-2xl bg-black text-white text-sm font-medium hover:scale-105 transition-all duration-200 shadow-sm">
                          View
                        </button>

                        <button className="px-4 py-2 rounded-2xl bg-emerald-500 text-white text-sm font-medium hover:scale-105 transition-all duration-200 shadow-sm">
                          Renew
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
