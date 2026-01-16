import { Routes, Route } from "react-router-dom";

import Events from "../pages/Events"; // Your Events.jsx
import EventDetail from "../pages/Events/EventDetails";
import Home from "../pages/Home";
import Newsletter from "../pages/landing/newsletter";
import AboutUS from "../pages/AboutUS";
import ComingSoon from "../pages/error/comingsoon";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:evntID" element={<EventDetail />} />
      <Route path="/newsletter" element={<Newsletter />} />
      {/* <Route path="/partners" element={<PartnersUs/>}/> */}
      <Route path="/about" element={<AboutUS />} />
      {/* Handle 404 - Not Found */}
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  );
};

export default AppRoutes;
