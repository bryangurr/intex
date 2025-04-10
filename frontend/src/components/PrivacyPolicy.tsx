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
            {/* 1. Identity and Contact Details */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">1. Who We Are</h2>
              <p>
                CineNiche (“we,” “us,” or “our”) is a movie streaming platform
                dedicated to curating cult classics, international cinema, indie
                films, and niche documentaries. While CineNiche is fictitious,
                it’s based on a similar model to Angel Studios in how it
                approaches audience engagement and content curation. We are
                committed to handling your personal data responsibly in
                accordance with the EU General Data Protection Regulation
                (GDPR).
              </p>
              <p>
                <strong>Contact Details:</strong>
                <br />
                <strong>Email:</strong> privacy@cineniche.com
                <br />
                <strong>Data Protection Officer (DPO):</strong> Jane Smith
                <br />
                <strong>Postal Address:</strong> 295 W Center St, Provo, UT
                84601, USA
              </p>
            </section>

            {/* 2. What Data We Collect */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">2. What Data We Collect</h2>
              <p>
                We collect personal data directly from you and, in some cases,
                indirectly from third parties. Examples of personal data we collect include:
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  username, password.
                </li>
                <li>
                  <strong>Usage Data:</strong> Streaming history, ratings,
                  viewing preferences.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type,
                  operating system, device identifiers.
                </li>
                <li>
                  <strong>Cookies and Tracking Data:</strong> Information about
                  your browsing habits on our website. (See Section 8)
                </li>
                <li>
                  <strong>Payment Details (if applicable):</strong> Partial or
                  tokenized payment information to process orders and prevent
                  fraud.
                </li>
                <li>
                  <strong>Indirectly Collected Data (from third parties):</strong>{" "}
                  If we receive personal data about you—e.g., from marketing
                  partners—we will inform you within one month or at the time of
                  first communication.
                </li>
              </ul>
            </section>

            {/* 3. How We Collect Your Data */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">3. How We Collect Your Data</h2>
              <p>
                You directly provide CineNiche with most of the data we collect.
                We collect data and process data when you:
              </p>
              <ul className="list-unstyled">
                <li>Register an account on our platform.</li>
                <li>Stream content or browse content listings.</li>
                <li>Submit feedback, participate in surveys, or send us emails.</li>
                <li>Voluntarily share your viewing preferences or reviews.</li>
                <li>Use or view our website or apps via your browser’s or device’s cookies.</li>
              </ul>
              <p>We may also receive your data indirectly from the following sources:</p>
              <ul className="list-unstyled">
                <li>Marketing or advertising partners.</li>
                <li>Third-party analytics or recommendation providers.</li>
              </ul>
            </section>

            {/* 4. Why We Process Your Data (Purposes & Legal Basis) */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">
                4. Purpose and Legal Basis for Processing
              </h2>
              <p>
                We process your personal data for the following purposes, in line with the GDPR’s requirements:
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong>To provide our streaming services:</strong> Necessary
                  for the performance of our contract with you.
                </li>
                <li>
                  <strong>To personalize recommendations:</strong> Based on your
                  usage data; conducted under our legitimate interest in
                  enhancing user experience.
                </li>
                <li>
                  <strong>To communicate with you:</strong> Respond to inquiries
                  and send updates about your account or policy changes
                  (performance of contract / legitimate interests).
                </li>
                <li>
                  <strong>To comply with legal obligations:</strong> For tax,
                  accounting, or other regulatory requirements.
                </li>
                <li>
                  <strong>To gather analytics:</strong> Understand how people
                  use our website and apps (legitimate interest).
                </li>
                <li>
                  <strong>To process payments and prevent fraud:</strong> Where
                  applicable, for contractual necessity and legal obligations.
                </li>
                <li>
                  <strong>Cookies and tracking technologies:</strong> Used with
                  your consent (see Section 8).
                </li>
              </ul>
              <p>
                Where we rely on your consent (e.g., for marketing emails or
                non-essential cookies), you have the right to withdraw consent
                at any time.
              </p>
            </section>

            {/* 5. Legitimate Interests */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">5. Legitimate Interests</h2>
              <p>
                In some instances, we process your personal data under the basis
                of legitimate interests. Examples include:
              </p>
              <ul className="list-unstyled">
                <li>Improving service offerings and user experiences.</li>
                <li>Enhancing personalization of our recommendations.</li>
                <li>Securing our website and preventing fraudulent activity.</li>
              </ul>
            </section>

            {/* 6. Data Sharing and Recipients */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">6. Data Sharing and Recipients</h2>
              <p>
                We do not sell your personal data. We only share data with
                third parties when necessary:
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong>Service Providers:</strong> Hosting services, payment
                  processors, and customer support platforms with GDPR-compliant
                  data processing agreements. For example, CineNiche might use
                  a cloud provider or an email marketing service similar to those
                  used by Angel Studios for promotions.
                </li>
                <li>
                  <strong>Analytics and Recommendation Platforms:</strong> Such
                  as analytics suites or personalized content recommendation
                  engines to optimize user experience.
                </li>
                <li>
                  <strong>Legal and Regulatory Authorities:</strong> Where
                  required by law or to protect our rights.
                </li>
              </ul>
              <p>
                Each recipient is contractually obligated to comply with data
                protection regulations and maintain the security of your data.
              </p>
            </section>

            {/* 7. International Transfers */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">7. International Transfers</h2>
              <p>
                If your data is transferred outside the European Economic Area
                (EEA), we use GDPR-approved safeguards (e.g., Standard
                Contractual Clauses) to ensure an adequate level of protection.
                For example, servers could be located in the United States,
                similar to how Angel Studios hosts its content, but we ensure
                all necessary measures to protect EU residents’ data.
              </p>
            </section>

            {/* 8. Cookies and Tracking */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">8. Cookies and Tracking Technologies</h2>
              <p>
                Cookies are text files placed on your computer to collect
                standard internet log information and visitor behavior
                information. We use both essential and non-essential cookies:
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong>Essential Cookies:</strong> Required for the
                  operation and security of our site (e.g., keeping you signed
                  in, preventing unauthorized access).
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Remember your
                  preferences (e.g., language), ensuring a tailored experience.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Evaluate how you interact
                  with our site, to help us improve its structure and features.
                </li>
                <li>
                  <strong>Advertising/Targeting Cookies:</strong> Track your
                  viewing habits on our site to provide relevant content and
                  promotional offers.
                </li>
              </ul>
              <p>
                You can manage cookies in your browser settings or decline
                non-essential cookies when prompted. Some site features may not
                function if you disable certain cookies. For more information,
                visit{" "}
                <a
                  href="https://allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  allaboutcookies.org
                </a>
                .
              </p>
            </section>

            {/* 9. Data Retention */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">9. Data Retention</h2>
              <p>
                We only store your personal data for as long as necessary to
                fulfill the purposes for which we collected it or to comply with
                legal obligations. In general:
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong>Account Data:</strong> Retained until your account is
                  deleted or 2 years after your last activity.
                </li>
                <li>
                  <strong>Transactional Records (if payments apply):</strong>{" "}
                  Kept for the duration required by law, commonly up to 7 years
                  for accounting compliance (similar to finance practices at
                  Angel Studios).
                </li>
                <li>
                  <strong>Analytics Data:</strong> Anonymized or deleted after
                  14 months.
                </li>
              </ul>
              <p>
                Once these periods expire, your data is securely deleted or
                anonymized according to our data management policies.
              </p>
            </section>

            {/* 10. Automated Decision-Making and Profiling */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">10. Automated Decision-Making and Profiling</h2>
              <p>
                We use automated processes, including profiling, to suggest
                content and tailor your experience based on your viewing
                history. This system helps us present movies and shows aligned
                with your interests.
              </p>
              <p>
                <strong>Significance and Consequences:</strong> Our
                recommendation engine influences what appears on your
                dashboard, but you remain free to explore our entire catalog. No
                content is locked or hidden based on your profile.
              </p>
            </section>

            {/* 11. Your Rights under GDPR */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">11. Your Data Protection Rights</h2>
              <p>Under the GDPR, you have the following rights:</p>
              <ul className="list-unstyled">
                <li><strong>Right of Access:</strong> Request copies of your personal data.</li>
                <li><strong>Right to Rectification:</strong> Ask us to correct inaccurate or incomplete data.</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain conditions.</li>
                <li><strong>Right to Restrict Processing:</strong> In certain circumstances, limit how we use your data.</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
                <li><strong>Right to Data Portability:</strong> Receive your personal data in a structured format or have it transferred to another organization.</li>
                <li><strong>Right to Withdraw Consent:</strong> Revoke consent at any time, if we rely on consent.</li>
              </ul>
              <p>
                We respond to valid requests within one month. To exercise any
                of these rights, please contact us at:{" "}
                <strong>privacy@cineniche.com</strong>.
              </p>
            </section>

            {/* 12. Statutory or Contractual Requirement */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">12. Provision of Personal Data</h2>
              <p>
                Providing certain personal data (e.g., registration information)
                is necessary to use our streaming services. Without this
                information, we cannot create or maintain your account. Other
                data, such as marketing preferences, is optional and can be
                updated or removed at any time.
              </p>
            </section>

            {/* 13. Complaints and Supervisory Authority */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">13. Right to Lodge a Complaint</h2>
              <p>
                If you believe we have not addressed your data protection
                concerns satisfactorily, you have the right to lodge a complaint
                with your local supervisory authority. In the EU, you can find
                your local authority’s contact details here:{" "}
                <a
                  href="https://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EU Data Protection Authorities
                </a>
                .
              </p>
            </section>

            {/* 14. Changes to This Policy */}
            <section className="mb-5">
              <h2 className="h5 fw-semibold mb-2">14. Changes to Our Privacy Policy</h2>
              <p>
                We keep our privacy policy under regular review and will publish
                any updates on this webpage. This privacy policy was last
                updated on April 7, 2025.
              </p>
            </section>

            {/* 15. Contact Us */}
            <section className="mb-3">
              <h2 className="h5 fw-semibold mb-2">15. Contact Us</h2>
              <p>
                For further questions about this policy or to exercise your
                rights, please contact us:
                <br />
                <strong>Email:</strong> privacy@cineniche.com
                <br />
                <strong>Phone:</strong> +1 (801) 555-1234
                <br />
                <strong>Address:</strong> 295 W Center St, Provo, UT 84601, USA
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
