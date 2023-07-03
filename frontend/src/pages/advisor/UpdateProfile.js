import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import { Input, Option, Select } from "@material-tailwind/react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [expertise, setExpertise] = useState("");
  const [education, setEducation] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(userInfo.profilePicture);

  useEffect(() => {
    setProfilePicture(userInfo.profilePicture);
    setFirstName(userInfo.firstName);
    setMiddleName(userInfo.middleName);
    setLastName(userInfo.lastName);
    setAge(userInfo.age);
    setContactNumber(userInfo.contactNumber);
    setGender(userInfo.gender);
    setBirthDate(userInfo.birthDate);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setFacebook(userInfo.facebook);
    setInstagram(userInfo.instagram);
    setLinkedIn(userInfo.linkedIn);
    setExpertise(userInfo.expertise);
    setEducation(userInfo.education);
    setCompany(userInfo.company);
  }, [userInfo]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setProfilePicture(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8080/api/users/profile", {
        userId: userInfo._id,
        firstName,
        middleName,
        lastName,
        age,
        contactNumber,
        gender,
        birthDate,
        email,
        address,
        facebook,
        instagram,
        linkedIn,
        expertise,
        education,
        company,
        password,
        verifyPassword,
        profilePicture,
      })
      .then((result) => {
        dispatch(setCredentials({ ...result.data }));
        navigate("/advisor/profile");
      });
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">ADD ADVISOR</h1>
            <section className="pt-2 overflow-auto max-h-[74vh]">
              <div className="px-6 h-full text-gray-800">
                <form
                  className="bg-white p-10 shadow-2xl"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-2 items-center justify-center mb-6">
                    <img
                      className="h-56 w-56 border-2 rounded-full"
                      src={profilePicture}
                      alt="nature image"
                    />
                    <h1 class="font-bold text-sm text-red-600">
                      Note: This default profile picture will be used if you
                      will not upload image.
                    </h1>
                    <div className="mt-2">
                      <div className="w-64">
                        <Input
                          label="Profile Picture"
                          type="file"
                          files={profilePicture}
                          onChange={handleFileUpload}
                          className="file:border-0  file:bg-gray-300 file:text-sm file:font-semibold file:rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-5">
                    {/* 1st Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Birth Date"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Expertise"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Facebook"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            icon={
                              <AiFillFacebook className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2nd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Middle Name"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Contact #"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Education"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            icon={
                              <AiFillInstagram className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* 3rd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select label="Select Gender">
                            <Option onClick={(e) => setGender("Male")}>
                              Male
                            </Option>
                            <Option onClick={(e) => setGender("Female")}>
                              Female
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="LinkedIn"
                            value={linkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                            icon={
                              <AiFillLinkedin className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-5">
                    {/* 1st Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* 2nd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Confirm Password"
                            type="password"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-right">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
          <DashboardFooter />
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProfile;
