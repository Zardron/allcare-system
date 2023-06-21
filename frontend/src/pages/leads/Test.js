import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    __id: "https://www.sunlife.com.ph/en/insurance/health-protection/sun-fit-and-well/",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    __id: "https://www.sunlife.com.ph/en/insurance/health-protection/sun-fit-and-well/",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "23/04/18",
    __id: "https://www.sunlife.com.ph/en/insurance/health-protection/sun-fit-and-well/",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "23/04/18",
    __id: "https://www.sunlife.com.ph/en/insurance/health-protection/sun-fit-and-well/",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "23/04/18",
    __id: "https://www.sunlife.com.ph/en/insurance/health-protection/sun-fit-and-well/",
  },
];

export default function Test() {
  const navigate = useNavigate();
  return (
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
        <tbody>
          {TABLE_ROWS.map(({ name, job, date, __id }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {job}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href={__id}
                    variant="small"
                    color="blue"
                    className="font-medium cursor-pointer"
                  >
                    Edit
                  </Typography>
                  <Typography
                    as="a"
                    href={__id}
                    variant="small"
                    color="blue"
                    className="font-medium cursor-pointer"
                  >
                    Book Now!
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
