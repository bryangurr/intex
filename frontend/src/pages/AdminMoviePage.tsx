// import React from "react";
import { useUser } from "../components/AuthorizeView";
import { Navigate } from "react-router-dom";
import AdminList from "../components/AdminList";
import WelcomeBand from "../components/WelcomeBand";
import GenreFilterDropdown from "../components/GenreFilter";
import { useState } from "react";

const AdminPage = () => {
  const user = useUser();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Don't allow access unless user is logged in *and* has admin role
  if (!user || !user.roles.includes("Admin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <WelcomeBand />

      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row mt-2">
          <div className="col-12 d-flex">
            <div className="genre-filter-wrapper">
              <GenreFilterDropdown
                selectedGenres={selectedGenres}
                onChange={setSelectedGenres}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5 text-white">
        <h2 className="text-white mb-4">Admin Dashboard</h2>
        <AdminList selectedGenres={selectedGenres} />
      </div>
    </>
  );
};

export default AdminPage;
