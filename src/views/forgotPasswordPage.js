import React, { useState, useRef, useEffect } from "react";
import ReactTextTransition, { presets } from "react-text-transition";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import Message from "components/Message";
import AuthService from "../services/authService";
import * as legoData from "../pops.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function ForgotPasswordPage(props) {
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [user, setUser] = useState({ email: "" });
  const [message, setMessage] = useState(null);
  const [alert, setAlert] = useState("");
  const [isvalid, setIsValid] = useState(true);
  const [isLoaded, setIsLoaded] = useState(undefined);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setUser({ email: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert("Validating email...");
    setIsLoaded(false);
    timerID = setTimeout(() => {
      AuthService.sendEmail(user).then((data) => {
        const { message } = data;
        setMessage(message);
        resetForm();
        if (message.msgError === true) {
          setIsValid(false);
          setAlert("Still looking...");
          timerID = setTimeout(() => {
            setIsLoaded(true);
          }, 2000);
        } else {
          setAlert("Sending mail..");
          timerID = setTimeout(() => {
            setIsValid(undefined);
            setIsLoaded(true);
          }, 2000);
          timerID = setTimeout(() => {
            props.history.push("/");
          }, 7000);
        }
      });
    }, 2000);
  };

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <IndexNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            {" "}
            {isLoaded === false ? (
              <FadeIn>
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={300}
                  style={{ marginTop: "150px" }}
                />
                <div className="container">
                  <ReactTextTransition
                    text={alert}
                    spring={presets.gentle}
                    delay={300}
                    className="h3"
                    inline
                  />
                </div>
              </FadeIn>
            ) : (
              <div>
                <h2 style={{ marginTop: "100px" }}>Forgot Password</h2>
                <Col className="ml-auto mr-auto" md="4">
                  <Card className="card-login card-plain">
                    <Form onSubmit={onSubmit} className="form">
                      <CardHeader className="text-center">
                        <div className="logo-container">
                          <img
                            alt="..."
                            src={require("assets/img/hostgidi-logo.png")}
                          ></img>
                        </div>
                      </CardHeader>
                      <CardBody>
                        {" "}
                        {message ? <Message message={message} /> : null}
                        {!isvalid === false ? (
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (emailFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons ui-1_email-85"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="User Email..."
                              variant="outlined"
                              required
                              value={user.email}
                              id="email"
                              onChange={onChange}
                              label="UserEmail"
                              name="email"
                              type="email"
                              onFocus={() => setEmailFocus(true)}
                              onBlur={() => setEmailFocus(false)}
                            ></Input>
                          </InputGroup>
                        ) : (
                          ""
                        )}{" "}
                      </CardBody>
                      <CardFooter className="text-center">
                        {!isvalid === false || undefined ? (
                          <Button
                            block
                            className="btn-round"
                            color="warning"
                            type="submit"
                            style={{ color: "blue" }}
                            size="lg"
                          >
                            Request Reset
                          </Button>
                        ) : (
                          ""
                        )}

                        <div className="pull-left">
                          <h6>
                            <a className="link" href="/register">
                              Register
                            </a>
                          </h6>
                        </div>
                        <div className="pull-right">
                          <h6>
                            <a
                              className="link"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Need Help?
                            </a>
                          </h6>
                        </div>
                      </CardFooter>
                    </Form>
                  </Card>
                </Col>
              </div>
            )}{" "}
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default ForgotPasswordPage;
