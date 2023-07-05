import {
  Button,
  Card,
  Chip,
  PopoverContent,
  PopoverHandler,
  Typography,
  Popover,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { RxGlobe } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = [
  "Name",
  "Description",
  "Type",
  "Company",
  "URL",
  "Status",
  "Action",
];

const MyCredentials = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myCredentials, setMyCredentials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/credentials", {
        userId: userId,
      })
      .then((result) => {
        setMyCredentials(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">MY CREDENTIALS</h1>
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
              {myCredentials.map((data, key) => (
                <>
                  <div className="p-10">
                    <img
                      className="h-full w-full rounded-lg shadow-xl shadow-blue-gray-900/50"
                      src={data.credentials}
                      alt="nature image"
                    />
                  </div>
                </>
              ))}
            </Card>
          </div>
          <DashboardFooter />
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default MyCredentials;
