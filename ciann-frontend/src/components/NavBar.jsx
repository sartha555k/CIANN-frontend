import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Links, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
 // console.log(user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {}
  };
  return (
    <div className="navbar bg-black shadow-sm fixed top-0 z-1 ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          CIANN
        </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-4 flex">
            <p className="px-4">Welcome , {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user Photo" src={user.photoUrl} />
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
                <Link to= "/connections">Connections</Link>
              </li>
              <li>
                <Link to= "/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
              
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
