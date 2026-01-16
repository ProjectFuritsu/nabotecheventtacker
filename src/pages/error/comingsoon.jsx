import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon/Graphic */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-50 scale-150"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <span className="text-6xl animate-pulse inline-block">🚀</span>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic uppercase mb-4">
          Something New is <span className="text-indigo-600">Coming Soon</span>
        </h1>

        <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          THE SIGNAL IS CLEAR. FORGET THE FLUFF. WE’RE UNLOCKING PANABO’S MOST
          EXCLUSIVE GATHERINGS. ARE YOU IN?"
        </p>

        {/* Intuitive Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
          >
            Go Back
          </button>

          <Link
            to="/events"
            className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-50 font-bold rounded-2xl hover:border-indigo-100 hover:bg-indigo-50/30 transition-all active:scale-95"
          >
            Explore Events
          </Link>
        </div>

        {/* Trust Badge */}
        {/* <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
          <span className="text-indigo-500">🛡️</span>
          Verified by NaboTech Standards
        </div> */}
      </div>
    </div>
  );
}
