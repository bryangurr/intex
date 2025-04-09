import React, { useEffect, useState } from "react";
import "../components/CookieBanner.css"; // Adjust the path as necessary

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    enableOptionalCookies();
  };

  const enableOptionalCookies = () => {
    // Place analytics or other non-essential cookie logic here
    // e.g. initialize Google Analytics
  };

  if (!visible) return null;

  return (
    <div className={`cookie-banner ${visible ? "show" : ""}`}>
      <p>
        This website uses cookies to ensure you get the best experience.{" "}
        <a href="/privacy-policy">Learn more</a>
      </p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
};

export default CookieBanner;
