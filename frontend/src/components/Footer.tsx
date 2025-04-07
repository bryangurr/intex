import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="bg-indigo-950 text-white text-sm text-center p-4">
    <p>
      © 2025 CineNiche |{" "}
      <Link to="/privacy" className="underline hover:text-gray-300 transition-colors">
        Privacy Policy
      </Link>
    </p>
  </footer>
);

export default Footer;

