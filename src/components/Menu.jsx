import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import logo from "../images/icon.jpeg"

const Menu = () => {

  return (
    <Container>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <img src={logo} alt="" height={60} width={60} className="me-3" />
          My NFT Machine
        </Link>
      </header>
    </Container>
  );
};

export default Menu;
