import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute({ auth }) {
  // console.log(isAuth);

  return auth === true ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
