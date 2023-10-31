import { Route, Routes } from "react-router";
import Navbar from "./Navbar";
import Profile from "../pages/Profile";
import Punch from "../pages/Punch";
import Leaves from "../pages/Leaves";

function MainApp() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/punch" element={<Punch />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route />
      </Routes>
    </div>
  );
}

export default MainApp;
