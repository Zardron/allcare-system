import { Button, Rating, Textarea, Typography } from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useLocation } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useState } from "react";

const ViewLeadsDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { user } = location.state;

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">LEADS PROFILE</h1>
            <section className="p-10 overflow-auto max-h-[74vh] bg-white">
              <div className="flex flex-row justify-between px-6 h-full text-gray-800">
                <div className="flex flex-col flex-[.3] gap-2 items-center justify-start mb-6">
                  <img
                    className="h-[215px] w-[220px]  w-auto border-2 rounded-full"
                    src={user.profilePicture}
                    alt="nature image"
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
                <div className="flex flex-[.7] flex-col">
                  <table className="w-[40%] min-w-max table-auto text-left">
                    <tr>
                      <td>
                        <span className="font-bold">First Name</span>
                      </td>
                      <td>
                        <Typography className="capitalize">
                          {" "}
                          <span className="mr-4"> :</span> {user.firstName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Middle Name</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mr-4"> :</span> {user.middleName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Last Name</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mr-4"> :</span> {user.lastName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Birth Date</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mr-4"> :</span> {user.birthDate}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Contact #</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mr-4"> :</span> {user.contactNumber}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Education</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mr-4"> :</span> {user.education}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Expertise</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mr-4"> :</span> {user.expertise}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Company</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mr-4"> :</span> {user.company}
                        </Typography>
                      </td>
                    </tr>
                    <Button onClick={() => setIsOpen(!isOpen)}>
                      Show Ratings & Review
                    </Button>
                    {isOpen ? (
                      <>
                        <tr>
                          <td>
                            <span className="font-bold">Rating</span>{" "}
                          </td>
                          <td>
                            <Typography className="flex items-center capitalize">
                              <span className="mr-4"> :</span>{" "}
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
                              <span className="mr-4"> :</span>{" "}
                              <Textarea
                                className=" w-[20rem]"
                                value={"Review text here"}
                              />
                            </Typography>
                          </td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                  </table>
                </div>
              </div>
            </section>
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default ViewLeadsDetails;
