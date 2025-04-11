import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";

interface User {
  email: string;
  roles: string[];
  name: string;
  id: number;
}

export const UserContext = createContext<User | null>(null);

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const emptyUser: User = { email: "", roles: [], name: "", id: -1 };
  const [user, setUser] = useState<User>(emptyUser);

  useEffect(() => {
    // === 🧪 Dummy login simulation ===

    // Simulate a logged-in user (not admin)

    // const simulatedUser: User = {
    //   email: "user@example.com",
    //   roles: ["user"],
    //   name: "Regular User",
    //   id: 10,
    // };

    // // Simulate an admin user
    // const simulatedUser: User = {
    //   email: "admin@example.com",
    //   roles: ["admin", "user"],
    //   name: "Admin User",
    //   id: 1,
    // };

    // // Simulate loading delay
    // setTimeout(() => {
    //   setUser(simulatedUser);
    //   setAuthorized(true);
    //   setLoading(false);
    // }, 500); // simulate 0.5s load

    // === 🧪 End simulation ===

    // Uncomment for real backend call (when ready)

    const fetchUser = async () => {
      try {
        const authRes = await fetch(
          "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/pingauth",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!authRes.ok) throw new Error("Unauthorized");
        // ✅ Make sure response has a body before parsing
        const contentType = authRes.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const authData = await authRes.json();
        try {
          const userDetailsRes = await fetch(
            `https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/api/Movies/byEmail/${authData.email}`
          );
          if (!userDetailsRes.ok)
            throw new Error("Failed to fetch user details");
          const userDetails = await userDetailsRes.json();

          setUser({
            email: authData.email,
            roles: authData.roles || [],
            name: userDetails.name || "User",
            id: userDetails.id || -1,
          });
          setAuthorized(true);
        } catch {
          setUser({
            email: authData.email,
            roles: ["None"],
            name: authData.email,
            id: 50,
          });
        }

        setAuthorized(true);
        console.log(authData.roles);
        localStorage.setItem("userRoles", JSON.stringify(authData.roles)); // store roles as JSON string
      } catch (err) {
        console.error("Auth failed", err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export function AuthorizedUser(props: {
  value: "email" | "name" | "id" | "roles";
}) {
  const user = React.useContext(UserContext);
  if (!user) return null;

  switch (props.value) {
    case "email":
      return <>{user.email}</>;
    case "name":
      return <>{user.name}</>;
    case "id":
      return <>{user.id}</>;
    case "roles":
      return <>{user.roles.join(", ")}</>;
    default:
      return null;
  }
}

export default AuthorizeView;
export const useUser = () => React.useContext(UserContext);
