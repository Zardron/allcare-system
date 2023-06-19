import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-[10%]">
          <SideMenu />
        </div>
        <div className="w-[90%]">
          <DashboardNavbar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
