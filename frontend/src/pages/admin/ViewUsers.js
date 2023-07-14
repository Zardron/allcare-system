import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Rating,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";
import axios from "axios";
import TableHeader from "./TableHeader";
import { useNavigate } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import Moment from "react-moment";

const headers = [
  { name: "Profile Picture", field: "profilePicture", sortable: false },
  { name: "Name", field: "firstName", sortable: true },
  { name: "Address", field: "address", sortable: false },
  { name: "User Type", field: "userType", sortable: true },
  { name: "Status", field: "isOnline", sortable: false },
  { name: "Action", field: "action", sortable: false },
];

const ViewUsers = () => {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const navigate = useNavigate();

  // setTimeout(() => {
  //   axios
  //     .get("http://localhost:8080/api/users")
  //     .then((result) => {
  //       setUserList(result.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, 3000);

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:8080/api/users")
        .then((result) => {
          setUserList(result.data);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  const searchData = useMemo(() => {
    let preData = userList;

    let newUserList = preData.filter((data) => data.userType !== "Admin");

    if (search) {
      newUserList = newUserList.filter(
        (user) =>
          user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.userType?.toLowerCase().includes(search.toLowerCase()) ||
          user?.address?.toLowerCase().includes(search.toLowerCase())
      );
    }

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      newUserList = newUserList.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    return newUserList;
  }, [userList, search, sorting]);

  const [open, setOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState([]);
  const handleClose = () => setOpen(false);

  const handleViewUser = (id) => {
    setOpen(true);
    const selectedUser = userList.filter((item) => item._id === id);
    setSelectedUserInfo(selectedUser);
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <Card className="overflow-scroll h-full w-full">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      Users List
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                      These are details about the users
                    </Typography>
                  </div>
                  <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <div className="w-full">
                      <Input
                        label="Search"
                        icon={<BsSearch className="h-5 w-5" />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <table className="w-full min-w-max table-auto text-left cursor-pointer">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {searchData.map((data, key) => (
                    <>
                      <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4 w-44">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <img
                              src={data.profilePicture}
                              className="h-10 w-10 rounded-full"
                              alt="as"
                            />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.firstName} {data.lastName}
                          </Typography>
                        </td>
                        <td className="p-4 w-36">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.address}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.userType}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <Chip
                              size="sm"
                              variant="ghost"
                              className="text-center ml-2 w-24"
                              value={
                                data.isOnline === true ? "Online" : "Offline"
                              }
                              color={data.isOnline === true ? "green" : "red"}
                            />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            onClick={() => handleViewUser(data._id)}
                          >
                            <MdPersonSearch className="h-5 w-5 text-blue-600" />
                          </Typography>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
          <DashboardFooter />
          <Dialog open={open} handler={handleViewUser} size="xl">
            <DialogHeader>User Info</DialogHeader>
            <DialogBody divider>
              {selectedUserInfo?.map((data) =>
                data.userType === "Advisor" ? (
                  <>
                    <div className="flex flex-row px-6 text-gray-800 gap-14">
                      <div className="flex flex-col  w-[25%] gap-2 items-center justify-start mb-6">
                        <Avatar
                          size="xxl"
                          alt="avatar"
                          src={data.profilePicture}
                          className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
                        />
                        <div className=" flex flex-row item-center justify-center gap-2">
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.facebook === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.facebook}`, "_blank");
                                }}
                              >
                                <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.instagram === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.instagram}`, "_blank");
                                }}
                              >
                                <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.linkedIn === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.linkedIn}`, "_blank");
                                }}
                              >
                                <AiFillLinkedin className="h-5 w-5 text-[#0072b1]" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <table className="w-[40%] min-w-max table-auto text-left">
                          <tr>
                            <td>
                              <span className="font-bold">First Name</span>
                            </td>
                            <td>
                              <Typography className="capitalize">
                                {" "}
                                <span className="mx-4"> :</span>{" "}
                                {data.firstName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Middle Name</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.middleName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Last Name</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.lastName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Civil Status</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.civilStatus}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Birth Date</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.birthDate}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Age</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.age}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Contact #</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.contactNumber}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Education</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.education}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">
                                Educational Level
                              </span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.educationalLevel}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Expertise</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.expertise}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Occupation</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.occupation}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Company</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.company}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Home Address</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.address}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Work Address</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.workAddress}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Rating</span>{" "}
                            </td>
                            <td>
                              <Typography className="flex items-center capitalize">
                                <span className="mx-4"> :</span>{" "}
                                <Rating value={data.rating} readonly />
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Joined Date</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                <Moment format="MMMM DD, YYYY">
                                  {data.createdAt}
                                </Moment>
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row px-6 text-gray-800 gap-14">
                      <div className="flex flex-col  w-[25%] gap-2 items-center justify-start mb-6">
                        <Avatar
                          size="xxl"
                          alt="avatar"
                          src={data.profilePicture}
                          className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
                        />
                        <div className=" flex flex-row item-center justify-center gap-2">
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.facebook === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.facebook}`, "_blank");
                                }}
                              >
                                <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.instagram === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.instagram}`, "_blank");
                                }}
                              >
                                <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.linkedIn === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.linkedIn}`, "_blank");
                                }}
                              >
                                <AiFillLinkedin className="h-5 w-5 text-[#0072b1]" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <table className="w-[40%] min-w-max table-auto text-left">
                          <tr>
                            <td>
                              <span className="font-bold">First Name</span>
                            </td>
                            <td>
                              <Typography className="capitalize">
                                {" "}
                                <span className="mx-4"> :</span>{" "}
                                {data.firstName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Middle Name</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.middleName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Last Name</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.lastName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Civil Status</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.civilStatus}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Birth Date</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.birthDate}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Age</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.age}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Contact #</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.contactNumber}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Education</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.education}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">
                                Educational Level
                              </span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.educationalLevel}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Occupation</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.occupation}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Home Address</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.address}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Work Address</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {data.workAddress}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Joined Date</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                <Moment format="MMMM DD, YYYY">
                                  {data.createdAt}
                                </Moment>
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </>
                )
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="gradient" color="red" onClick={handleClose}>
                <span>Close</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </main>
      </div>
    </>
  );
};

export default ViewUsers;
