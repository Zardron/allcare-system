import {
  Button,
  Chip,
  Rating,
  Textarea,
  Typography,
  Card,
  Avatar,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { Link, useLocation } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { RxGlobe } from "react-icons/rx";

const TABLE_HEAD = [
  "Name",
  "Description",
  "Type",
  "Company",
  "URL",
  "Status",
  // "Action",
];

const ViewAdvisorDetails = () => {
  const location = useLocation();

  const { user } = location.state;

  const [userId] = useState(user._id);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/product/advisor-product", {
        userId: userId,
      })
      .then((result) => {
        setMyProducts(result.data);
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
            <h1 class="font-bold text-2xl text-gray-700">ADVISOR PROFILE</h1>
            <section className="p-10 overflow-auto max-h-[74vh] bg-white">
              <Link
                to={"/leads/view-advisor"}
                className="flex flex-row gap-2 items-center mb-10"
              >
                <BsArrowLeft className="h-6 w-6" />
                Go Back
              </Link>
              <div className="flex flex-row px-6 text-gray-800 gap-14">
                <div className="flex flex-col  w-[15%] gap-2 items-center justify-start mb-6">
                  <Avatar
                    size="xxl"
                    alt="avatar"
                    src={user.profilePicture}
                    className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
                  />
                  <div className=" flex flex-row item-center justify-center gap-2">
                    <div className="mb-6">
                      <div className="">
                        <Button
                          size="md"
                          variant="outlined"
                          color="blue-gray"
                          className="flex items-center gap-3"
                          onClick={(e) => {
                            window.open(
                              `https://www.${user.facebook}`,
                              "_blank"
                            );
                          }}
                        >
                          <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="">
                        <Button
                          size="md"
                          variant="outlined"
                          color="blue-gray"
                          className="flex items-center gap-3"
                          onClick={(e) => {
                            window.open(
                              `https://www.${user.instagram}`,
                              "_blank"
                            );
                          }}
                        >
                          <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="">
                        <Button
                          size="md"
                          variant="outlined"
                          color="blue-gray"
                          className="flex items-center gap-3"
                          onClick={(e) => {
                            window.open(
                              `https://www.${user.linkedIn}`,
                              "_blank"
                            );
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
                          <span className="mx-4"> :</span> {user.firstName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Middle Name</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span> {user.middleName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Last Name</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span> {user.lastName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Birth Date</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span> {user.birthDate}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Contact #</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span> {user.contactNumber}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Education</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span> {user.education}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Expertise</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span> {user.expertise}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Company</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span> {user.company}
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
                          <Rating value={4} readonly />
                        </Typography>
                      </td>
                    </tr>

                    <tr>
                      <td className=" flex flex-start items-start">
                        <span className="font-bold">Review</span>{" "}
                      </td>
                      <td>
                        <Typography className="flex items-start capitalize">
                          <span className="mx-4"> :</span>{" "}
                          <Textarea
                            className="w-[20rem]"
                            value={"Review text here"}
                          />
                        </Typography>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <h1 class="font-bold text-2xl text-gray-700 mb-2">PRODUCTS</h1>
              <Card className="overflow-scroll max-h-[50vh] w-full">
                {myProducts.length === 0 ? (
                  <>
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                    </table>
                    <div className="flex w-full h-[50vh] items-center justify-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-4xl"
                      >
                        NO PRODUCT FOUND
                      </Typography>
                    </div>
                  </>
                ) : (
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {myProducts
                        .filter((item) => item.productStatus === true)
                        .map((data, key) => (
                          <>
                            <tr className="even:bg-blue-gray-50/50">
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.productName}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.productDescription}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.productType}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.company}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Button
                                  size="md"
                                  variant="outlined"
                                  className="flex items-center gap-3 text-blue-600"
                                  onClick={(e) => {
                                    window.open(`${data.productUrl}`, "_blank");
                                  }}
                                >
                                  <RxGlobe className="h-5 w-5 text-blue-600" />
                                </Button>
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
                                      data.productStatus ? "Active" : "Inactive"
                                    }
                                    color={data.productStatus ? "green" : "red"}
                                  />
                                </Typography>
                              </td>
                              {/* <td className="p-4">
                            <Popover placement="bottom-end">
                              <PopoverHandler>
                                <Button>Edit Status</Button>
                              </PopoverHandler>
                              <PopoverContent className=" flex flex-col gap-4">
                                <Typography className="flex flex-row items-center">
                                  Current Status:{" "}
                                  <Chip
                                    size="sm"
                                    variant="ghost"
                                    className="text-center ml-2 w-24"
                                    value={
                                      data.productStatus ? "Active" : "Inactive"
                                    }
                                    color={data.productStatus ? "green" : "red"}
                                  />
                                </Typography>

                                <Typography>Change Status:</Typography>
                                <div className="flex flex-row items-center justify-between gap-2">
                                  <Typography
                                    onClick={() => handleSelect("green")}
                                  >
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className={`text-center w-24  cursor-pointer ${
                                        selectedGreen &&
                                        "shadow-lg shadow-green-500/50"
                                      }`}
                                      value={"Active"}
                                      color={"green"}
                                    />
                                  </Typography>
                                  <Typography
                                    onClick={() => handleSelect("red")}
                                  >
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className={`text-center w-24  cursor-pointer ${
                                        selectedRed &&
                                        "shadow-lg shadow-red-500/50"
                                      }`}
                                      value={"Inactive"}
                                      color={"red"}
                                    />
                                  </Typography>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </td> */}
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                )}
              </Card>
            </section>
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default ViewAdvisorDetails;
