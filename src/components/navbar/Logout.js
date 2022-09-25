import React from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <span
      onClick={handleLogout}
      className="cursor-pointer ml-2 font-semibold hover:bg-indigo-800 bg-indigo-100 hover:text-white text-indigo-500 px-4 py-1 rounded-md"
    >
      Logout
    </span>
  );
};

export default Logout;
