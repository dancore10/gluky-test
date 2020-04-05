import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import {Navbar, Nav, Button} from "react-bootstrap";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>

    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="gk-navbar fixed-top">
      <Navbar.Brand href="#home">
        <img
          src="https://gluky.com/assets/images/img_home/up-gluky_logo.png"
          width="100"
          className="d-inline-block align-top"
          alt="Gluky logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && (
            <span>
              <Link className="btn btn-light" to="/">Home</Link>&nbsp;
              <Link className="btn btn-light" to="/posts">Posts</Link>
            </span>
          )}
        </Nav>
        <Nav>
          <Link className="btn btn-light" to="/profile">
            {user && (<img src={user.picture} width="30" className="d-inline-block align-top photo_profile" alt=" profile"/>)}
            {user && (<span className="gk-nickname">{user.nickname}</span>)}
          </Link>
          <Nav.Link eventKey={2} href="#">
            {!isAuthenticated && (<Button variant="success" onClick={() => loginWithRedirect({})}>Log in</Button>)}
            {isAuthenticated && <Button variant="outline-danger" onClick={() => logout()}>Log out</Button>}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
};

export default NavBar;