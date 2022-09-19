import { Link, Navigate, useNavigate } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import logo from "../images/icon.jpeg"

const MenuLayout = (props) => {
    const { admin } = props
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const logoutBtn = () => {
        localStorage.clear();
        window.location.reload()
    }
    return (
        <Container>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <Link
                    to="/"
                    className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
                >
                    <img src={logo} alt="" height={60} width={60} className="me-3" />
                    <span style={{color:'#ffffff'}}>My NFT Machine</span>
                </Link>
                <Nav>{admin && (<>
                    <button type="submit" className="btn btn-primary" style={{ marginRight: "20px" }} onClick={() => navigate("/change-password")}>Forget Password</button>
                    {admin === "admin" ? (<ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "20px" }} onClick={() => navigate("/admin/usersData")}>Users Info</button>
                    </ul>) : (<ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "20px" }} onClick={() => navigate("/admin/home")}>Home</button>
                    </ul>)}
                </>)}

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        {token ? <li> <button type="submit" className="btn btn-primary" onClick={logoutBtn}>Logout</button></li> : null}
                    </ul>
                </Nav>
            </header>
        </Container>
    );
};

export default MenuLayout;
