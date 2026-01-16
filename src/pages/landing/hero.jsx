import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Navigates to the events page with the search term in the URL
    navigate(`/events?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="mt-12 max-w-7xl mx-auto px-4 md:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-8 md:p-12 shadow-sm">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h3 className="text-3xl text-gray-900 font-extrabold md:text-4xl">
            What's happening in Panabo?
          </h3>
          <p className="mt-4 text-gray-600 text-lg">
            Search hundreds of events from verified local organizers.
          </p>

          <div className="mt-8">
            <form
              onSubmit={handleSearch}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search festivals, workshops, etc..."
                className="flex-1 p-4 rounded-xl border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg active:scale-95"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
