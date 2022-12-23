import React from "react";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/slice/authSlice";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import { searchTour } from "../redux/slice/tourSlice";
const Header = () => {
  const [searchtour, setSearchTour] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const logouthandler = () => {
    dispatch(setLogout());
    navigate("/login");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchtour) {
      dispatch(searchTour(searchtour));
      navigate(`/search?${searchtour}`);
      setSearchTour("");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Tour Pedia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={NavLink} to="/addtour">
                    Add Tour
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                </>
              ) : (
                ""
              )}
              {user && (
                <h6 className="me-3 ms-3">
                  {" "}
                  <BiUser className="userIcon" />
                  {user?.result?.name}
                </h6>
              )}
              {user ? (
                <p onClick={logouthandler}>Logout</p>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
              <Form onSubmit={handleSubmit} className="ms-4">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchtour}
                  onChange={(e) => setSearchTour(e.target.value)}
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
