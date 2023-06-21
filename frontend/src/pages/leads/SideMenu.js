import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import {
  RiProductHuntFill,
  RiStarHalfFill,
  RiUserSearchFill,
} from "react-icons/ri";
import { MdOutlineRateReview, MdReviews } from "react-icons/md";

const SideMenu = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white">
        <div className="sidebar-header flex items-center justify-center py-4">
          <div className="inline-flex">
            <Link to="/leads/dashboard">
              <img
                src="https://scontent.fdxb2-1.fna.fbcdn.net/v/t1.15752-9/354946562_1430185717737352_2093950262901227618_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=GZORsWn0Li8AX96PYYk&_nc_ht=scontent.fdxb2-1.fna&oh=03_AdRsED-PzIHHq8I_YGD2Bx52DVC4G5HMh5EkH1EkMGjILw&oe=64B3E809"
                alt="brand"
                classNameName="h-20 w-auto"
              />
            </Link>
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <Link
                to="/leads/dashboard"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                <Link to="/leads/dashboard">
                  <span className="ml-3">Dashboard</span>
                </Link>
              </Link>
            </li>

            <li className="my-px">
              <Link
                to="/leads/view-advisor"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiUserSearchFill className="h-6 w-6" />
                <Link to="/leads/view-advisor">
                  <span className="ml-3">View Advisor</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
              <Link
                to="/leads/add-leads"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiProductHuntFill className="h-6 w-6" />
                <Link to="/leads/add-leads">
                  <span className="ml-3">View Product</span>
                </Link>
              </Link>
              <Link
                to="/leads/advisor-rating-list"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiStarHalfFill className="h-6 w-6" />
                <Link to="/leads/advisor-rating-list">
                  <span className="ml-3">View Ratings</span>
                </Link>
              </Link>
              <Link
                to="/leads/add-leads"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <MdReviews className="h-6 w-6" />
                <Link to="/leads/add-leads">
                  <span className="ml-3">View Review</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
              <Link
                to="/leads/add-leads"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <MdOutlineRateReview className="h-6 w-6" />
                <Link to="/leads/add-leads">
                  <span className="ml-3">Complaint</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li className="my-px">
              <span className="flex font-medium text-sm text-black px-4 my-4 uppercase">
                Account
              </span>
            </li>
            <li className="my-px">
              <Link
                to="/leads/profile"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <Link to="/leads/profile">
                  <span className="ml-3">Profile</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="#"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </span>
                <span className="ml-3">Notifications</span>
                <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  10
                </span>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/leads/dashboard"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="ml-3">Settings</span>
              </Link>
            </li>
            <li className="my-px">
              <Link
                onClick={logoutHandler}
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-red-400">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="ml-3" onClick={logoutHandler}>
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
