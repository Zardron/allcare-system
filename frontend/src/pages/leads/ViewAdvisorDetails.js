import {
  Button,
  Chip,
  Rating,
  Textarea,
  Typography,
  Card,
  Avatar,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { BsArrowLeft, BsCalendar2Check, BsSearch } from "react-icons/bs";
import { RxGlobe } from "react-icons/rx";
import { useSelector } from "react-redux";
import ProductTableHeader from "./ProductTableHeader";

const productHeader = [
  { name: "Name", field: "productName", sortable: true },
  { name: "Description", field: "productDescription", sortable: false },
  { name: "Type", field: "productType", sortable: true },
  { name: "Company", field: "company", sortable: true },
  { name: "Url", field: "productUrl", sortable: false },
  { name: "Status", field: "productStatus", sortable: false },
  { name: "Action", field: "action", sortable: false },
];

const ViewAdvisorDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  const navigate = useNavigate();

  const [userId] = useState(location?.state?.user?._id);
  const [myProducts, setMyProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const searchData = useMemo(() => {
    let preData = myProducts;

    let newProductList = preData.filter((data) => data.userType !== "Admin");

    if (search) {
      newProductList = newProductList.filter(
        (product) =>
          product?.productName?.toLowerCase().includes(search.toLowerCase()) ||
          product?.productType?.toLowerCase().includes(search.toLowerCase()) ||
          product?.company?.toLowerCase().includes(search.toLowerCase())
      );
    }

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      newProductList = newProductList.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    return newProductList;
  }, [myProducts, search, sorting]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/product/advisor-product", {
        userId: userId,
      })
      .then((result) => {
        setMyProducts(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleAppointment = (productId, advisorId, leadsId) => {
    navigate("/leads/book-appointment", {
      state: {
        productId: productId,
        advisorId: advisorId,
        leadsId: leadsId,
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
                    src={location?.state?.user?.profilePicture}
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
                              `https://www.${location?.state?.user?.facebook}`,
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
                              `https://www.${location?.state?.user?.instagram}`,
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
                              `https://www.${location?.state?.user?.linkedIn}`,
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
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.firstName}
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
                          {location?.state?.user?.middleName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Last Name</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.lastName}
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
                          {location?.state?.user?.birthDate}
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
                          {location?.state?.user?.contactNumber}
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
                          {location?.state?.user?.education}
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
                          {location?.state?.user?.expertise}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Company</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.company}
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
              <h1 class="font-bold text-2xl text-gray-700 mb-2">PRODUCTS</h1>{" "}
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
                          Product List
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                          These are details about the product of advisor
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
                    <ProductTableHeader
                      headers={productHeader}
                      onSorting={(field, order) => setSorting({ field, order })}
                    />
                    <tbody>
                      {searchData
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
                              <td className="p-4 max-w-xs">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal text-justify"
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
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  className="font-normal underline text-blue-600 cursor-pointer"
                                >
                                  <BsCalendar2Check
                                    onClick={() =>
                                      handleAppointment(
                                        data._id,
                                        location?.state?.user?._id,
                                        userInfo._id
                                      )
                                    }
                                    className="h-6 w-6"
                                  />
                                </Typography>
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            </section>
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default ViewAdvisorDetails;
