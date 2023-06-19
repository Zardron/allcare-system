import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
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
    <Disclosure as="div" className="bg-white border-b py-2 border-gray-400">
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center"></div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {userInfo ? (
                  <>
                    <button
                      type="button"
                      className="rounded-full border border-gray-500 p-1 text-gray-400 hover:focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="data:image/png;base64,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"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {userInfo.name}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                My Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={logoutHandler}
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Logout
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <Link to="/login">
                    <button
                      type="button"
                      className="rounded-md px-6 py-1 bg-blue-500 text-black"
                    >
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default DashboardNavbar;
