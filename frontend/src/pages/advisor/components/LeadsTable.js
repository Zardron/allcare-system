import { Typography } from "@material-tailwind/react";
import React from "react";
import { useGetLeadsQuery } from "../../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";

const AdvisorTable = ({ userId }) => {
  const { user } = useGetLeadsQuery("leadsList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const navigate = useNavigate();

  const handleSelectLeads = (id) => {
    navigate("/advisor/leads-details", {
      state: {
        user,
      },
    });
  };

  return (
    <>
      <tr className="even:bg-blue-gray-50/50">
        <td className="p-4">
          <img src={user.profilePicture} className="h-10 w-10 rounded-full" />
        </td>
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
          <Typography
            variant="small"
            color="blue"
            className="font-medium cursor-pointer"
            onClick={() => handleSelectLeads(user._id)}
          >
            <SlMagnifier className="h-6 w-6" />
          </Typography>
        </td>
      </tr>
    </>
  );
};

export default AdvisorTable;
