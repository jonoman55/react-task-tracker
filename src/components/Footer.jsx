import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <p>Copyright &copy; {new Date().getFullYear()}</p>
    <Link to='/about' style={{
      textDecoration: 'none', color: 'purple'
    }}>
      About
    </Link>
  </footer>
);

export default Footer;
