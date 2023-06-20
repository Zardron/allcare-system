import { Typography } from "@material-tailwind/react";
import React from "react";
import { useGetAdvisorUsersQuery } from "../../../slices/usersApiSlice";

const AdvisorTable = ({ userId }) => {
  const { user } = useGetAdvisorUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <>
      <tr className="even:bg-blue-gray-50/50">
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.firstName}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.education}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.expertise}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.company}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.rating}
          </Typography>
        </td>
        <td className="p-4">
          <Typography
            as="a"
            href="#"
            variant="small"
            color="blue"
            className="font-medium"
          >
            Edit
          </Typography>
        </td>
      </tr>
    </>
  );
};

export default AdvisorTable;
