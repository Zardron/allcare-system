import {
  Card,
  CardHeader,
  Chip,
  Input,
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

const headers = [
  { name: "Profile Picture", field: "profilePicture", sortable: false },
  { name: "Name", field: "firstName", sortable: true },
  { name: "Contact #", field: "contactNumber", sortable: false },
  { name: "Email", field: "email", sortable: false },
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

  const handleViewUser = (id) => {
    navigate("/admin/user-details", {
      state: {
        userId: id,
      },
    });
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
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.contactNumber}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.email}
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
        </main>
      </div>
    </>
  );
};

export default ViewUsers;
