import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainApp from "./components/MainApp";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* to navigate to signin page as default page */}
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
