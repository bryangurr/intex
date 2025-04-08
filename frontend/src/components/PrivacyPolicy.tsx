import WelcomeBand from "./WelcomeBand";

const PrivacyPolicy = () => {
  return (
    <div>
      <div>
        <WelcomeBand />
      </div>
      <div className="container my-5">
        <div
          className="bg-white rounded-4 shadow p-5 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <h1 className="display-5 fw-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            <strong>Effective Date:</strong> April 7, 2025
          </p>
          <div className="text-start">
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">1. Who We Are</h2>
              <p>
                CineNiche is a movie streaming platform. We are committed to
                handling your personal data responsibly and transparently in
                accordance with the General Data Protection Regulation (GDPR).
              </p>
              <p>
                <strong>Contact Email:</strong> privacy@cineniche.com
              </p>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">2. What Data We Collect</h2>
              <ul className="list-unstyled mb-0">
                <li>Account Information: name, email, username, password</li>
                <li>Usage Data: pages visited, time spent, movies watched</li>
                <li>Device Info: IP address, browser type, OS</li>
                <li>Cookies: See section below</li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">
                3. Why We Collect Your Data
              </h2>
              <ul className="list-unstyled mb-0">
                <li>Provide access to streaming features</li>
                <li>Improve performance and recommendations</li>
                <li>Understand user behavior</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">
                4. Legal Basis for Processing
              </h2>
              <ul className="list-unstyled mb-0">
                <li>Performance of a contract</li>
                <li>Consent (e.g., for cookies)</li>
                <li>Legitimate interest (e.g., analytics)</li>
                <li>Legal obligation</li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">
                5. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies to remember preferences, analyze usage, and
                enhance recommendations. A cookie consent banner appears when
                you visit the site. Non-essential cookies are only used with
                your consent.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">6. Who We Share Data With</h2>
              <p>We do not sell your data. We may share data with:</p>
              <ul className="list-unstyled">
                <li>Hosting and storage providers</li>
                <li>Analytics services</li>
                <li>Third-party video/recommendation services</li>
              </ul>
              <p>All providers are GDPR-compliant.</p>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">7. Data Retention</h2>
              <ul className="list-unstyled mb-0">
                <li>
                  Account data: kept until deletion or 2 years of inactivity
                </li>
                <li>Analytics: anonymized or deleted within 14 months</li>
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">8. Your GDPR Rights</h2>
              <ul className="list-unstyled">
                <li>Access, correction, deletion of your data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, email us at{" "}
                <strong>privacy@cineniche.com</strong>.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">
                9. International Transfers
              </h2>
              <p>
                Your data may be processed outside your country. We use
                GDPR-approved safeguards to protect it.
              </p>
            </section>

            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">10. Policy Changes</h2>
              <p>
                We may update this policy. All updates will appear on this page
                with the effective date.
              </p>
            </section>

            <section className="mb-3">
              <h2 className="h5 fw-semibold mb-2">11. Contact Us</h2>
              <p>
                If you have any questions or concerns, contact us at:
                <br />
                <strong>Email:</strong> privacy@cineniche.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
