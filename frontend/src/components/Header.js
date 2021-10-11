import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <header>
      <Navbar bg="light" expand="lg" className="py-2 ">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>The Little Mart</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              {userInfo ? (
                <LinkContainer to="/account">
                  <Nav.Link>
                    <i className="fas fa-user fa-lg"></i>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="far fa-user fa-lg"></i>
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart fa-lg"></i>{" "}
                  {cartItems.length}
                </Nav.Link>
              </LinkContainer>
            </Nav>

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>All Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>All Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>All Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
