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
  console.log("print: ", isAuth);

  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* to navigate to signin page as default page */}
    //     {/* <Route path="/" element={<Navigate to="/signin" />} /> */}
    //     {/* <Route path="/signin" element={<Signin />} />
    //     <Route path="/punch" element={<Punch />} /> */}

    //     <Route path="/" element={<PrivateRoute />}>
    //       <Route path="/punch" element={<Punch />} />
    //     </Route>
    //     <Route path="/signin" element={<Signin />} />
    //     {/* <Route path="/*" element={<MainApp />} /> */}
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/signin"
          element={isAuth ? <Navigate to={"/punch"} /> : <Signin />}
        />
        <Route element={<PrivateRoute auth={isAuth} />}>
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/punch" element={<Punch />} />
          <Route path="/leaves" element={<Leaves />} /> */}
          <Route path="/punch" element={<Punch />} />
          <Route path="/*" element={isAuth && <MainApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
