import { Navigate, Outlet } from "react-router-dom";
import { useGetUserProfileQuery } from "../store/userSlice";

const ProtectRoute = () => {
    const { data, isLoading } = useGetUserProfileQuery();

    if (isLoading) return null; // Show loading while fetching user

    // Check if user exists and is an admin
    if (!data?.user || data.user.role !== "admin") {
        return <Navigate to="/" replace />; // Redirect to login if not admin
    }

    return <Outlet />; // ✅ Render admin routes if user is an admin
};

export default ProtectRoute;
