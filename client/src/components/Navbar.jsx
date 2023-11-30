import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const [profPic, setProfPic] = useState("");
  const { profilePicture } = useSelector(
    (state) => state.employee.currentEmployee
  );

  useEffect(() => {
    setProfPic(profilePicture);
  }, [profilePicture]);
  // console.log(profilePicture);
  return (
    <div className="flex flex-row mx-auto items-center  justify-center bg-slate-700">
      <div className="flex px-3 py-4">
        <ul className="flex gap-16 text-white text-md sm:text-lg font-semibold">
          <Link to="/profile">
            <li>Profile</li>
          </Link>

          <Link to="/leaves">
            <li>Leaves</li>
          </Link>

          <Link to="/punch">
            <li>Punch</li>
          </Link>

          <Link to="/profile">
            <img
              src={profPic}
              alt="employee pic"
              className="h-7 w-7 rounded-full object-cover"
            />
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
