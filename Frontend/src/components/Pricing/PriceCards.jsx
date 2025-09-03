import React from 'react'

export default function PriceCards() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Basic Plan */}
        <div className="bg-green-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 ease-in-out flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Basic Plan</h2>
          <p className="text-4xl font-semibold mb-4">
            ₹500<span className="text-lg font-normal">/month</span>
          </p>
          <ul className="mb-6 space-y-6 py-6 text-gray-700 flex-1">
            <li>Access to gym facilities</li>
            <li>2 group classes per week</li>
            <li>1 personal training session</li>
            <li>Basic support</li>
          </ul>
          <button className="bg-amber-400 hover:bg-emerald-300 transition-transform duration-300 ease-in-out text-white px-6 py-3 rounded-lg w-full mt-auto">
            Choose Plan
          </button>
        </div>

        {/* Half Yearly Plan */}
        <div className="bg-gradient-to-b from-fuchsia-50 via-fuchsia-100 to-fuchsia-200 p-8 rounded-2xl shadow-lg hover:shadow-2xl bg-white hover:scale-[1.02] transition-transform duration-300 ease-in-out flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Half Yearly Plan</h2>
          <p className="text-4xl font-semibold mb-4">
            ₹2500<span className="text-lg font-normal">/month</span>
          </p>
          <ul className="mb-6 space-y-6 py-6 text-gray-700 flex-1">
            <li>Access to gym facilities</li>
            <li>Priority support</li>
            <li>3 group classes per week</li>
            <li>6 personal training session</li>
            <li>Advance support</li>
          </ul>
          <button className="bg-amber-600 hover:bg-emerald-500 transition-transform duration-300 ease-in-out text-white px-6 py-3 rounded-lg w-full mt-auto">
            Choose Plan
          </button>
        </div>

        {/* Annual Plan */}
        <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl bg-green-50 hover:scale-[1.02] transition-transform duration-300 ease-in-out flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Annual Plan</h2>
          <p className="text-4xl font-semibold mb-4">
            ₹5000<span className="text-lg font-normal">/month</span>
          </p>
          <ul className="mb-6 space-y-6 py-6 text-gray-700 flex-1">
            <li>Access to gym facilities</li>
            <li>5 group classes per week</li>
            <li>Free fitness assessment</li>
            <li>Nutrition consultation</li>
            <li>12 personal training session</li>
            <li>Advance support</li>
          </ul>
          <button className="bg-amber-600 hover:bg-emerald-500 transition-transform duration-300 ease-in-out text-white px-6 py-3 rounded-lg w-full mt-auto">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  )
}
