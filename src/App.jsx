import CNavbar from "./components/cNavbar";
import Hero from "./pages/landing/hero";
import Newsletter from "./pages/landing/newsletter";
import Partners from "./pages/landing/partners";
import AppRoutes from "./Routes/index.route";

const App = () => {
  return (
    <>
      <CNavbar />

      <main className="grow">
        <AppRoutes />
      </main>


      
    </>
  );
};

export default App;
