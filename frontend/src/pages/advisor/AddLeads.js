import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { useSelector, useDispatch } from "react-redux";
import { useAddUserMutation } from "../../slices/usersApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLeads = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [addUser] = useAddUserMutation();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setProfilePicture(base64);

    console.log(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      toast.error("Password does not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        const savedUser = await addUser({
          profilePicture,
          name,
          email,
          password,
        }).unwrap();

        if (savedUser) {
          toast.success("User successfully added!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (err) {
        toast.error(err?.data?.message || err.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-[10%]">
          <SideMenu />
        </div>
        <div className="w-[90%]">
          <DashboardNavbar />
          <section className="pt-2">
            <div className="px-6 h-full text-gray-800">
              <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 ">
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                  <form
                    className="bg-white p-10 rounded-3xl shadow-2xl"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                      <p className="text-center font-semibold mx-4 mb-0">
                        Add Lead Account
                      </p>
                    </div>
                    <div className="mb-6">
                      <input
                        type="file"
                        class="form-control block w-full text-sm text-slate-500 border-2 py-1 rounded border-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:border-0  file:bg-gray-300 
                    file:text-sm file:font-semibold file:rounded
                  "
                        files={profilePicture}
                        onChange={handleFileUpload}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Confirm Password"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                      />
                    </div>

                    <div className="text-center lg:text-left">
                      <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddLeads;
