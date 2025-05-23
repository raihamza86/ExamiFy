import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import DashboardNavbar from "./Components/DashboardNavbar";

const AdminLayout = () => {
  return (
    <div className="admin-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Admin Top Navbar */}
      <DashboardNavbar />
      <div className="admin-main" style={{ display: "flex", flex: 1 }}>
        {/* Sidebar on the left */}
        <Sidebar />
        {/* Content area for nested admin pages */}
        <div className="admin-content" style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
