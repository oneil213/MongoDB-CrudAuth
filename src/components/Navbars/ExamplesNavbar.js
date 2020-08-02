import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import { AuthContext } from "context/authContext";
import Logout from "components/Modal/LogoutModal";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = useState("navbar-warning");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const unauthenticatedNavBar = () => {
    return (
      <>
        <UncontrolledDropdown nav>
          <DropdownToggle caret color="default" href="/chart" nav>
            <i className="now-ui-icons business_briefcase-24"></i>
            <p>ABOUT</p>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem to="/index" tag={Link}>
              <i className="now-ui-icons business_briefcase-24"></i>
              All components
            </DropdownItem>
            <DropdownItem to="/chart" tag={Link}>
              <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
              SamplePost
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <NavLink href="/chart">
            <i className="now-ui-icons design-2_ruler-pencil"></i>
            <p>Blog</p>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="./login">
            <i className="now-ui-icons objects_key-25"></i>
            <p>Login</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <Button
            className="nav-link btn-warning"
            color="default"
            href="/register"
            id="upgrade-to-pro"
            style={{ color: "blue" }}
          >
            <i className="now-ui-icons users_single-02"></i>
            <p>Register Here</p>
          </Button>
        </NavItem>
        <NavItem>
          <NavLink
            href="https://twitter.com/comparelight"
            target="_blank"
            id="twitter-tooltip"
          >
            <i className="fab fa-twitter"></i>
            <p className="d-lg-none d-xl-none">Twitter</p>
          </NavLink>
          <UncontrolledTooltip target="#twitter-tooltip">
            Follow us on Twitter
          </UncontrolledTooltip>
        </NavItem>
        <NavItem>
          <NavLink
            href="https://www.facebook.com/compare.light"
            target="_blank"
            id="facebook-tooltip"
          >
            <i className="fab fa-facebook-square"></i>
            <p className="d-lg-none d-xl-none">Facebook</p>
          </NavLink>
          <UncontrolledTooltip target="#facebook-tooltip">
            Like us on Facebook
          </UncontrolledTooltip>
        </NavItem>
        <NavItem>
          <NavLink
            href="https://www.instagram.com/comparelight_nigeria/"
            target="_blank"
            id="instagram-tooltip"
          >
            <i className="fab fa-instagram"></i>
            <p className="d-lg-none d-xl-none">Instagram</p>
          </NavLink>
          <UncontrolledTooltip target="#instagram-tooltip">
            Follow us on Instagram
          </UncontrolledTooltip>
        </NavItem>
      </>
    );
  };
  const authenticatedNavBar = () => {
    return (
      <>
        <UncontrolledDropdown nav>
          <DropdownToggle
            caret
            color="default"
            href="#pablo"
            nav
            onClick={(e) => e.preventDefault()}
          >
            <i className="now-ui-icons business_briefcase-24"></i>
            <p>ABOUT</p>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem to="/" tag={Link}>
              <i className="now-ui-icons business_briefcase-24"></i>
              Our Team
            </DropdownItem>
            <DropdownItem href="/">
              <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
              Documentation
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          {" "}
          {user.role.includes("admin") ? (
            <NavLink href="/admin">
              <i className="now-ui-icons users_single-02"></i>
              <p>Admin</p>
            </NavLink>
          ) : null}{" "}
        </NavItem>
        <NavItem>
          {" "}
          {user.role.includes("manager") ? (
            <NavLink href="/manager">
              <i className="now-ui-icons business_badge"></i>
              <p>Manager</p>
            </NavLink>
          ) : null}{" "}
        </NavItem>
        <NavItem>
          {" "}
          {user.role.includes("user") ? (
            <NavLink href="/profile">
              <i className="now-ui-icons users_circle-08"></i>
              <p>Profile</p>
            </NavLink>
          ) : null}{" "}
        </NavItem>
        <NavItem>
          <NavLink
            href="https://twitter.com/comparelight"
            target="_blank"
            id="twitter-tooltip"
          >
            <i className="fab fa-twitter"></i>
            <p className="d-lg-none d-xl-none">Twitter</p>
          </NavLink>
          <UncontrolledTooltip target="#twitter-tooltip">
            Follow us on Twitter
          </UncontrolledTooltip>
        </NavItem>
        <NavItem>
          <NavLink
            href="https://www.facebook.com/compare.light"
            target="_blank"
            id="facebook-tooltip"
          >
            <i className="fab fa-facebook-square"></i>
            <p className="d-lg-none d-xl-none">Facebook</p>
          </NavLink>
          <UncontrolledTooltip target="#facebook-tooltip">
            Like us on Facebook
          </UncontrolledTooltip>
        </NavItem>
        <NavItem>
          <NavLink
            href="https://www.instagram.com/comparelight_nigeria/"
            target="_blank"
            id="instagram-tooltip"
          >
            <i className="fab fa-instagram"></i>
            <p className="d-lg-none d-xl-none">Instagram</p>
          </NavLink>
          <UncontrolledTooltip target="#instagram-tooltip">
            Follow us on Instagram
          </UncontrolledTooltip>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );
  };

  return (
    <>
      {" "}
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
        className={"fixed-top " + navbarColor}
        expand="lg"
        color="warning"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="/" id="navbar-brand">
              Authentication
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Designed by Adeola Oni. Coded by Adeola oni
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              {!isAuthenticated
                ? unauthenticatedNavBar()
                : authenticatedNavBar()}{" "}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
