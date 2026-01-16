import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import yaml from "js-yaml";

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams(); // Added this

  const [searchQuery, setSearchQuery] = useState("");
  const [eventData, setEventData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Events");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSearchChange = (value) => {
    setSearchQuery(value);

    // Update the URL parameter as the user types
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({}); // Clear URL params if input is empty
    }
  };

  useEffect(() => {
    const queryFromUrl = searchParams.get("search") || "";
    setSearchQuery(queryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    // Note: Ensure your file is at public/src/data/event.yaml
    // or public/event.yaml if using fetch("/event.yaml")
    fetch("/data/event.yaml")
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);

        console.log(data);

        if (data && data.events) {
          setEventData(data.events);
        }
      })
      .catch((err) => console.error("Failed to load YAML:", err));
  }, []);

  // --- Filtering Logic ---
  const filteredEvents = eventData.filter((event) => {
    // 1. Search Logic: Does the name, organizer, OR category contain the search text?
    const searchTerm = searchQuery.toLowerCase().trim();
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm) ||
      event.organizer.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm);

    // 2. Tab Logic: Does the event belong to the selected category?
    const matchesTab =
      activeTab === "All Events" ||
      event.category === activeTab ||
      (activeTab === "Upcoming" && !event.is_event_done);

    // 3. Combine: BOTH must be true
    return matchesSearch && matchesTab;
  });

  const evaluationEvents = filteredEvents.filter((e) => e.is_event_done);

  const happeningNowEvents = filteredEvents.filter((e) => {
    const eventDate = new Date(e.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime() && !e.is_event_done;
  });

  // 2. Separate Upcoming (Strictly in the Future)
  const upcomingEvents = filteredEvents.filter((e) => {
    const eventDate = new Date(e.date);
    eventDate.setHours(0, 0, 0, 0);

    // The fix: Add "eventDate > today" so it EXCLUDES today's events
    return eventDate > today && !e.is_event_done;
  });

  // Check if anything at all was found

  return (
    <div className="bg-white min-h-screen">
      {/* --- Page Header --- */}
      <header className="bg-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Community Events
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Connecting Panaoans through safe, verified, and meaningful local
            gatherings.
          </p>
        </div>
      </header>

      {/* --- Filter & Search Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Search Card - Reduced padding on mobile (p-4) vs desktop (md:p-6) */}
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border border-gray-100">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />

            {/* INTUITIVE ADDITION: Quick Clear Button */}
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* --- Tabs --- */}
        {/* Added 'no-scrollbar' and maintained 'whitespace-nowrap' for smooth mobile sliding */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar mt-6 md:mt-10">
          {[
            "All Events",
            "Upcoming",
            "Workshops",
            "Festivals",
            "Music",
            "Gaming",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all shrink-0 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {upcomingEvents.length === 0 &&
      happeningNowEvents.length === 0 &&
      evaluationEvents.length === 0 ? (
        /* --- NO RESULTS MESSAGE --- */
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900">No events found</h3>
          <p className="text-gray-500 mt-2">
            We couldn't find anything matching "{searchQuery}" in {activeTab}.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("All Events");
            }}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* --- Section 1: Evaluation --- */}
          {evaluationEvents.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">📝</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  Share Your Feedback
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {evaluationEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-4 bg-amber-50/50 border border-amber-100 rounded-xl hover:bg-amber-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{event.name}</h4>
                      <p className="text-sm text-gray-500">
                        Held on{" "}
                        {event.date instanceof Date
                          ? event.date.toLocaleDateString()
                          : event.date}
                      </p>
                    </div>
                    <a
                      href={event.evaluationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-4 px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700 transition"
                    >
                      Evaluate
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- SECTION 2: Ongoing EVENTS --- */}
          {(activeTab === "All Events" || activeTab != "Upcoming") &&
            happeningNowEvents.length > 0 && (
              <section className="mb-16">
                {/* Header Section */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
                    Happening Now
                  </h2>
                </div>

                <div className="grid gap-6">
                  {happeningNowEvents.map((event) => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      /* Added a defined border-gray-200 and a slightly thicker border on hover to match the 'bold' vibe */
                      className="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-200 hover:border-gray-900 shadow-sm hover:shadow-md"
                    >
                      {/* Image Section */}
                      <div className="md:w-64 h-44 md:h-auto overflow-hidden relative shrink-0">
                        <img
                          src={event.image_url}
                          alt={event.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="text-red-600 text-[10px] font-black uppercase italic tracking-widest">
                              {event.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight uppercase italic tracking-tight">
                            {event.name}
                          </h3>

                          <p className="text-gray-500 text-sm line-clamp-2 mt-2 leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                            </svg>
                            <span className="text-xs font-medium uppercase tracking-tighter">
                              {event.venue}
                            </span>
                          </div>

                          <span className="text-gray-900 text-xs font-black uppercase italic flex items-center group-hover:text-red-600">
                            View Info
                            <svg
                              className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          {/* --- SECTION 3: UPCOMING EVENTS --- */}
          {upcomingEvents.length > 0 ? (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Upcoming Events
                </h2>
              </div>

              {/* Conditional Rendering: Grid vs No Results */}

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                      <div className="absolute top-4 left-4 z-10 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {event.category}
                      </div>
                      <img
                        src={event.image_url}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {event.name}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mt-2">
                        {event.description}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between text-indigo-600 font-bold text-sm">
                        <span>{event.venue}</span>
                        <div className="flex items-center">
                          View Details
                          <svg
                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : (
            <></>
          )}
        </main>
      )}
    </div>
  );
}
