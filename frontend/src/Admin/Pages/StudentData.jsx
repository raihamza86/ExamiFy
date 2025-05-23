import React from "react";
import { toast } from "react-toastify";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation, // Import update role mutation
} from "../../store/adminSlice";
import { User2Icon } from "lucide-react";

const StudentData = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation(); // Use update role mutation

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh] bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold text-lg animate-pulse">
            📄 Loading Users...
          </p>
        </div>
      </div>
    );

  if (!users || users.length === 0) {
    return <p className="text-gray-600 text-center mt-4">🚫 No users available.</p>;
  }
  if (error) return <p className="text-red-500">Error loading users</p>;

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        toast.success("User deleted successfully! 🎉");
      } catch (err) {
        toast.error("Error deleting user:" + err.message);
      }
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      toast.success(`User role updated to ${newRole} successfully! 🎉`);
    } catch (err) {
      toast.error("Error updating role:" + err.message);
    }
  };

  return (
    <div className="p-4 md:ml-[250px]">
      <h1 className="text-3xl font-bold text-center mb-6">Student Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition duration-300"
          >
            <img
              src="/profile.avif"
              alt={user.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
            />
            <h2 className="text-lg font-bold mt-3">{user.name}</h2>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-700 font-semibold">Role: {user.role}</p>

            {/* Role Update Buttons */}
            <div className="mt-4 flex space-x-2">
              {user.role !== "admin" && (
                <button
                  onClick={() => handleRoleUpdate(user._id, "admin")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer"
                >
                  Make Admin
                </button>
              )}
              {user.role !== "user" && (
                <button
                  onClick={() => handleRoleUpdate(user._id, "user")}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 hover:cursor-pointer"
                >
                  Make User
                </button>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(user._id)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentData;
