import React from "react";
import { useUser } from "../components/AuthorizeView";
import { Navigate } from "react-router-dom";
import AdminList from "../components/AdminList";
import WelcomeBand from "../components/WelcomeBand";

const AdminPage = () => {
  const user = useUser();

  // Don't allow access unless user is logged in *and* has admin role
  if (!user || !user.roles.includes("admin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <WelcomeBand />
      <div className="container mt-5 pt-5 text-white">
        <h2 className="text-white mb-4">Admin Dashboard</h2>
        <AdminList selectedGenres={[]} />
      </div>
    </>
  );
};

export default AdminPage;
