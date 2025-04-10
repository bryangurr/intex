import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";

interface User {
  email: string;
  roles: string[];
}
export const UserContext = createContext<User | null>(null);

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state
  //const navigate = useNavigate();
  let emptyuser: User = { email: "", roles: [] };

  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);
        //console.log('AuthorizeView: Raw Response:', response);

        const contentType = response.headers.get("content-type");

        // Ensure response is JSON before parsing
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server");
        }

        const data = await response.json();

        if (data.email) {
          setUser({ email: data.email, roles: data.roles || [] });
          setAuthorized(true);
        } else {
          throw new Error("Invalid user session");
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry(
      "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/pingauth",
      {
        method: "GET",
        credentials: "include",
      }
    );
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null; // Prevents errors if context is null

  if (props.value === "email") return <>{user.email}</>;

  // if (props.value === "roles") return <>{user.roles.join(", ")}</>;

  return null;
}

export default AuthorizeView;
export const useUser = () => React.useContext(UserContext);
