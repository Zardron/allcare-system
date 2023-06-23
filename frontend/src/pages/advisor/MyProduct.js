import {
  Button,
  Card,
  Chip,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
  Switch,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TABLE_HEAD = [
  "Name",
  "Description",
  "Type",
  "Company",
  "URL",
  "Status",
  // "Action",
];

const MyProducts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myProducts, setMyProducts] = useState([]);
  // const [productStatus, setProductStatus] = useState();
  // const [selectedGreen, setSelectedGreen] = useState(false);
  // const [selectedRed, setSelectedRed] = useState(false);

  // const handleSelect = (color) => {
  //   if (color === "green") {
  //     setSelectedGreen(true);
  //     setSelectedRed(false);
  //   } else {
  //     setSelectedGreen(false);
  //     setSelectedRed(true);
  //   }
  // };

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
            <h1 class="font-bold text-2xl text-gray-700">MY PRODUCTS</h1>
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
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
                    {myProducts.map((data, key) => (
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
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.productUrl}
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
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default MyProducts;
