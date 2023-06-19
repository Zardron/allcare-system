import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PresentationChartBarIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  PowerIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

const SideMenu = () => {
  const [open, setOpen] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(userInfo);
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (id) => {
    setOpen(id);
  };

  const handleOpen = (id) => {
    setOpen(id);
  };
  return (
    <Card className="fixed h-full  border-r rounded-none border-gray-400 w-full max-w-[15rem] shadow-xl shadow-blue-gray-900/5">
      <div className="flex flex-col items-center gap-2 p-2">
        <Link to="/advisor-dashboard">
          <img
            src="https://scontent.fdxb2-1.fna.fbcdn.net/v/t1.15752-9/354946562_1430185717737352_2093950262901227618_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=GZORsWn0Li8AX96PYYk&_nc_ht=scontent.fdxb2-1.fna&oh=03_AdRsED-PzIHHq8I_YGD2Bx52DVC4G5HMh5EkH1EkMGjILw&oe=64B3E809"
            alt="brand"
            className="h-20 w-auto"
          />
        </Link>
        <Link to="/my-profile">
          <img
            className="h-[8rem] w-[8rem] rounded-full"
            src={userInfo?.profilePicture}
            alt=""
          />
        </Link>
        <div className="flex flex-row items-center justify-center">
          <p>Welcome:</p>{" "}
          <span className="ml-2 text-gray-500">{userInfo?.name}</span>
        </div>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => (open === 1 ? handleClose(0) : handleOpen(1))}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Leads
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/add-leads">
                <ListItem>
                  <ListItemPrefix>
                    <UserGroupIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Add Leads
                </ListItem>
              </Link>
              <Link to="/view-leads">
                <ListItem>
                  <ListItemPrefix>
                    <MagnifyingGlassIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  View Leads
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <BellIcon className="h-5 w-5" />
          </ListItemPrefix>
          Notification
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <Link to="/my-profile">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            My Profile
          </ListItem>
        </Link>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={logoutHandler}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default SideMenu;
