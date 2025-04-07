import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto text-left bg-indigo-950 text-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6"><strong>Effective Date:</strong> April 7, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Who We Are</h2>
        <p>
          CineNiche is a movie streaming platform. We are committed to handling
          your personal data responsibly and transparently in accordance with
          the General Data Protection Regulation (GDPR).
        </p>
        <p><strong>Contact Email:</strong> privacy@cineniche.com</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. What Data We Collect</h2>
        <div className="space-y-2">
          <p>Account Information: name, email, username, password</p>
          <p>Usage Data: pages visited, time spent, movies watched</p>
          <p>Device Info: IP address, browser type, OS</p>
          <p>Cookies: See section below</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Why We Collect Your Data</h2>
        <div className="space-y-2">
          <p>Provide access to streaming features</p>
          <p>Improve performance and recommendations</p>
          <p>Understand user behavior</p>
          <p>Comply with legal obligations</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Legal Basis for Processing</h2>
        <div className="space-y-2">
          <p>Performance of a contract</p>
          <p>Consent (e.g., for cookies)</p>
          <p>Legitimate interest (e.g., analytics)</p>
          <p>Legal obligation</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies to remember preferences, analyze usage, and enhance recommendations. A
          cookie consent banner appears when you visit the site. Non-essential
          cookies are only used with your consent.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Who We Share Data With</h2>
        <p>We do not sell your data. We may share data with:</p>
        <div className="space-y-2">
          <p>Hosting and storage providers</p>
          <p>Analytics services</p>
          <p>Third-party video/recommendation services</p>
        </div>
        <p>All providers are GDPR-compliant.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
        <div className="space-y-2">
          <p>Account data: kept until deletion or 2 years of inactivity</p>
          <p>Analytics: anonymized or deleted within 14 months</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Your GDPR Rights</h2>
        <div className="space-y-2">
          <p>Access, correction, deletion of your data</p>
          <p>Restrict or object to processing</p>
          <p>Data portability</p>
          <p>Withdraw consent at any time</p>
        </div>
        <p>To exercise these rights, email us at <strong>privacy@cineniche.com</strong>.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. International Transfers</h2>
        <p>
          Your data may be processed outside your country. We use GDPR-approved
          safeguards to protect it.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">10. Policy Changes</h2>
        <p>
          We may update this policy. All updates will appear on this page with
          the effective date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
        <p>
          If you have any questions or concerns, contact us at:
          <br />
          <strong>Email:</strong> privacy@cineniche.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
