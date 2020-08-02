import React, { useState, useEffect, createRef } from "react";
// reactstrap components
import { Container } from "reactstrap";

// core components
import AuthService from "services/authService";

function ProfilePageHeader() {
  const [user, setUser] = useState([]);
  let pageHeader = createRef();

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/headerimg.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/hostgidi-logo.png")}></img>
          </div>
          <h2
            style={{
              color: "green",
              marginTop: "10px",
            }}
          >
            Welcome
          </h2>
          <h3
            style={{
              marginTop: "5px",
              fontWeight: "600",
            }}
          >
            {user.username ? user.username.toUpperCase() : <p>False User</p>}
          </h3>
          <p className="category" style={{ color: "red" }}>
            {user.role ? "Profile page" : <span>False Role</span>}
          </p>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
