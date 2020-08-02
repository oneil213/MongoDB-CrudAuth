import React, { useEffect } from "react";

// reactstrap components
import { Button, Container, UncontrolledTooltip } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import AdminPageHeader from "components/Headers/AdminPageHeader";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function AdminPage() {
  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <AdminPageHeader />
        <div className="section">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                Follow
              </Button>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip515203352"
                size="lg"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip515203352">
                Follow me on Twitter
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Follow me on Instagram
              </UncontrolledTooltip>
            </div>
            <h3 className="title">About Admin</h3>
            <h5 className="description">write something</h5>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default AdminPage;
