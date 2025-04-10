import WelcomeBand from "../components/WelcomeBand";
import AuthorizeView from "./AuthorizeView";

const Unauthorized = () => {
  return (
    <>
      <AuthorizeView>
        <WelcomeBand />
      </AuthorizeView>
      <div className="container text-center text-white mt-5 pt-5">
        <h1>🚫 Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <p>
          Please go back to the pages you have access to or contact support if
          you believe this is an error.
        </p>
      </div>
    </>
  );
};

export default Unauthorized;
