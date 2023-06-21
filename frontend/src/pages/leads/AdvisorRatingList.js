import { Card, Rating, Textarea, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";

const TABLE_HEAD = ["Name", "Rating", "Review"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    review: "Maayo nga Financial Advisor",
    rate: 5,
  },
  {
    name: "Alexa Liras",
    review: "Dili kahibaw mo unsaon pag explain sa product",
    rate: 3,
  },
  {
    name: "Laurent Perrier",
    review: "Ok ra siya",
    rate: 4,
  },
  {
    name: "Michael Levi",
    review: "Bulay.og di kahibaw",
    rate: 2,
  },
  {
    name: "Richard Gran",
    review: "Kamao raman siya",
    rate: 4,
  },
];

export default function AdvisorRatingList() {
  return (
    <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <SideMenu />
      <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
        <DashboardNavbar />
        <div class="main-content flex flex-col flex-grow p-4">
          <Card className="overflow-scroll h-full w-full">
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
              <tbody className="p-10">
                {TABLE_ROWS.map((data, key) => (
                  <>
                    <tr key={key} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Rating value={data.rate} readonly />
                      </td>
                      <td className="p-4">
                        <Textarea value={data.review} />
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
  );
}
