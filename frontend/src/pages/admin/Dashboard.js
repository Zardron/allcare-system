import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4">
            <h1 class="font-bold text-2xl text-gray-700">Dashboard</h1>
            <div class="flex flex-col flex-grow bg-white rounded mt-4">
              DASHBOARD CONTENT HERE
            </div>
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
