import React from "react";
import { useGetUserProfileQuery } from "../../store/userSlice";

const DashboardNavbar = () => {

  const { data, isLoading, error } = useGetUserProfileQuery();

  if (isLoading) return <p className="text-center py-4">Loading profile...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Error fetching profile</p>;

  const user = data?.user || {};

  const userAvatar =
    "https://omah.dexignzone.com/php/demo/assets/images/profile/17.jpg";

  return (
    <nav className="shadow-md px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-50">

      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold ml-10">
          LOGO.<span className="text-yellow-400"></span>
        </h1>
      </div>


      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="text-sm font-medium">{user.name || "Name not available"}</div>
          <small className="text-black-500 text-xs">{user.role || "Role not available"}</small>
        </div>
        <img
          src={userAvatar}
          alt="Admin Avatar"
          className="w-12 h-12 object-cover rounded-md"
        />
      </div>
    </nav>
  );
};

export default DashboardNavbar;
