import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Leaves from "./pages/Leaves";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Punch from "./pages/Punch";
import Signin from "./pages/Signin";
import { useSelector } from "react-redux";
import MainApp from "./components/MainApp";

function App() {
  const isAuth = useSelector((state) => state.employee.signedIn);
  // console.log("print: ", isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/signin"
          element={isAuth ? <Navigate to={"/punch"} /> : <Signin />}
        />
        <Route element={<PrivateRoute auth={isAuth} />}>
          <Route path="/*" element={isAuth && <MainApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
