import React, { useState, useContext } from "react";

// reactstrap components
import { Button, Modal, NavLink } from "reactstrap";

// core components
import AuthService from "services/authService";
import { AuthContext } from "context/authContext";

function Logout() {
  const [modalSmall, setModalSmall] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  return (
    <>
      <NavLink
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setModalSmall(true);
        }}
      >
        <i className="now-ui-icons ui-1_lock-circle-open "></i>
        <p>Logout</p>
      </NavLink>

      <Modal
        isOpen={modalSmall}
        className="modal-sm"
        modalClassName="bd-example-modal-sm"
        toggle={() => setModalSmall(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" style={{ textAlign: "center" }}>
            Log Out
          </h5>
        </div>
        <div className="modal-body">
          <p>Are you sure you want logout from Authentication web App?</p>
        </div>
        <div className="modal-footer">
          <Button
            onClick={() => setModalSmall(false)}
            color="secondary"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={onClickLogoutHandler}
            color="warning"
            style={{ color: "blue" }}
            type="button"
          >
            Log Out
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Logout;
