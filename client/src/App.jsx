import { Outlet } from "react-router-dom";
import Navbar from "./components/common/NavBar";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a 2-second delay
    const delay = 3000;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <div className=" flex h-screen justify-center items-center">
          <PacmanLoader color="#f08400" size={40} loading={loading} />
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default App;
