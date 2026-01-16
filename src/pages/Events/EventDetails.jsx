import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import yaml from "js-yaml";

export default function EventDetails() {
  const { evntID } = useParams(); // Matches the :evntid in your route
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/data/event.yaml")
      .then((res) => res.text())
      .then((text) => {
        const parsed = yaml.load(text);
        let dataArray = Array.isArray(parsed) ? parsed : parsed.events || [];

        // 1. Find Current Event
        const found = dataArray.find(
          (item) => String(item.id) === String(evntID)
        );
        setEvent(found);

        // 2. Random Suggestions Logic
        // Filter out the current event so it doesn't suggest itself
        const otherEvents = dataArray.filter(
          (item) => String(item.id) !== String(evntID)
        );

        // Shuffle and pick 3
        const shuffled = otherEvents.sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 3));

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [evntID]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Event not found</h2>
        <Link
          to="/events"
          className="text-indigo-600 hover:underline mt-4 inline-block"
        >
          Return to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/events"
          className="text-gray-600 hover:text-indigo-600 flex items-center gap-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Events
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4">
        {/* Event Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl h-75 md:h-112.5 mb-8">
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {event.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 italic uppercase tracking-tighter">
              {event.name}
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Organized by {event.organizer}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 min-w-50">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Date
            </p>
            <p className="text-gray-900 font-bold">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
              Venue
            </p>
            <p className="text-gray-900 font-bold">{event.venue}</p>
          </div>
        </div>

        {/* Description Section */}
        <section className="prose prose-indigo max-w-none border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About the Event
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {event.description}
          </p>
        </section>

        {/* Action / Evaluation Section */}
        {event.is_event_done && event.evaluationLink && (
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-amber-900">
                Event has concluded
              </h3>
              <p className="text-amber-700">
                Watch the recap video and provide your feedback.
              </p>
            </div>
            <a
              href={event.evaluationLink}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition shadow-lg shadow-amber-200"
            >
              Watch & Evaluate
            </a>
          </div>
        )}
      </main>

      {/* Suggested Events Section */}
      <section className="w-full bg-gray-50 border-t border-gray-100 mt-20 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Suggested Events
            </h2>
            <div className="h-1 w-12 bg-indigo-600 mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestions.map((sugg) => (
              <Link
                key={sugg.id}
                to={`/events/${sugg.id}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={sugg.image_url}
                    alt={sugg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase">
                    {sugg.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-indigo-600">
                    {sugg.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(sugg.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
