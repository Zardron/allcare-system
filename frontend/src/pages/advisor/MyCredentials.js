import {
  Button,
  Card,
  Chip,
  PopoverContent,
  PopoverHandler,
  Typography,
  Popover,
  Carousel,
  IconButton,
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
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

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
            <Card className=" h-auto w-full p-10 flex items-center justify-center">
              <Carousel
                className="rounded-xl  w-[800px]"
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 -translate-y-2/4 left-4 text-blue-600"
                  >
                    <RiArrowLeftSLine className="w-12 h-12" />
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 -translate-y-2/4 !right-4 text-blue-600 border-none"
                  >
                    <RiArrowRightSLine className="w-12 h-12" />
                  </IconButton>
                )}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i
                            ? "bg-blue-600 w-8"
                            : "bg-blue-600/50 w-4"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
              >
                {myCredentials.map((data, key) => (
                  <>
                    <img
                      src={data.credentials}
                      alt="image 1"
                      className="h-[480px] w-[800px] object-contain"
                    />
                  </>
                ))}
              </Carousel>
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
