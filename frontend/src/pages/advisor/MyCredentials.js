import {
  Avatar,
  Button,
  Card,
  Carousel,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const MyCredentials = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myCredentials, setMyCredentials] = useState([]);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/credentials", {
        userId: userId,
      })
      .then((result) => {
        setMyCredentials(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const [open, setOpen] = useState(false);
  const handleOpen = (src) => {
    setImgSrc(src);
    setOpen((cur) => !cur);
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">MY CREDENTIALS</h1>
            <div className="flex flex-row gap-5 flex-wrap">
              {myCredentials.map((data, key) => (
                <Card
                  className="h-64 w-[32%] cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                  onClick={() => handleOpen(data.credentials)}
                >
                  <img
                    alt="nature"
                    className="h-full w-full object-cover object-center"
                    src={data.credentials}
                  />
                </Card>
              ))}
            </div>

            <Dialog size="xl" open={open} handler={handleOpen}>
              <DialogHeader className="justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="tania andrew"
                    src={userInfo.profilePicture}
                  />
                  <div className="-mt-px flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {userInfo.firstName + " " + userInfo.lastName}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-xs font-normal"
                    >
                      {userInfo.occupation}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button color="red" size="sm" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogHeader>
              <DialogBody divider={true} className="p-0">
                <img
                  alt="nature"
                  className="h-[35rem] w-full object-contain object-center"
                  src={imgSrc}
                />
              </DialogBody>
            </Dialog>
          </div>
          <DashboardFooter />
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default MyCredentials;
