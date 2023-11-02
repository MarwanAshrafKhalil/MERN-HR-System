import { useSelector } from "react-redux/";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const employeeSignedIn = useSelector((state) => state.employee.signedIn);
  console.log(employeeSignedIn);

  return employeeSignedIn ? (
    <Navigate to="/punch" />
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoute;
