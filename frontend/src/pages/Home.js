import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.userType === "Admin") {
        navigate("/admin/dashboard");
      }
      if (userInfo.userType === "Advisor") {
        navigate("/advisor/dashboard");
      }
    }
  }, [navigate, userInfo]);

  return (
    <>
      <Navbar />
      <div>Home</div>
    </>
  );
};

export default Home;
