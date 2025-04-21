import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import { BASE_URL } from "../constants/BaseConstants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/UserSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile", {
        withCredentials: true, // Equivalent to `credentials: "include"` in fetch
      });
      if (response.data?.data) {
        dispatch(addUser(response.data.data));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
