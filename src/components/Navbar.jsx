import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../constants/BaseConstants";
import { removeUser } from "../redux/UserSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      let response = await axios.post(BASE_URL + "/logout", {
        withCredentials: true,
      });
      console.log("==>res", response);
      response = response.data;
      if (response.outcome === "success") {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {user ? (
        <div className="flex gap-2">
          {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}

          <h2 className="font-mono font-thin items-center flex items-center">
            {user?.firstName}
          </h2>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
