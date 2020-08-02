import React, { useState, useContext, useRef, useEffect } from "react";
import * as legoData from "../pops.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactTextTransition, { presets } from "react-text-transition";

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
import { AuthContext } from "../context/authContext";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function LoginPage(props) {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [alert, setAlert] = useState("");
  const [isLoaded, setIsLoaded] = useState(undefined);
  let timerID = useRef(null);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert("Validating Username...");
    setIsLoaded(false);
    timerID = setTimeout(() => {
      AuthService.login(user).then((data) => {
        const { isAuthenticated, user, message } = data;
        setMessage(message);
        if (isAuthenticated) {
          setAlert("Logging in...");
          timerID = setTimeout(() => {
            setIsLoaded(true);
          }, 2000);
          timerID = setTimeout(() => {
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            props.history.push("profile");
          }, 2000);
        } else {
          setIsLoaded(true);
          setMessage(message);
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
            {isLoaded === false ? (
              <FadeIn>
                <div className="container" style={{ marginTop: "200px" }}>
                  <Lottie
                    options={defaultOptions}
                    height={300}
                    width={300}
                    style={{ marginTop: "150px" }}
                  />
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
                <h2 style={{ marginTop: "100px" }}>Login</h2>
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
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (firstFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="User Name..."
                            variant="outlined"
                            required
                            value={user.username}
                            id="username"
                            onChange={onChange}
                            label="UserName"
                            name="username"
                            type="text"
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                          ></Input>
                        </InputGroup>
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (lastFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons text_caps-small"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Your Password..."
                            variant="outlined"
                            required
                            name="password"
                            onChange={onChange}
                            type="password"
                            id="password"
                            onFocus={() => setLastFocus(true)}
                            onBlur={() => setLastFocus(false)}
                          ></Input>
                        </InputGroup>
                      </CardBody>
                      <CardFooter className="text-center">
                        <Button
                          block
                          className="btn-round"
                          color="warning"
                          type="submit"
                          style={{ color: "blue" }}
                          size="lg"
                        >
                          Login
                        </Button>
                        {message ? <Message message={message} /> : null}
                        <div className="pull-left">
                          <h6>
                            <a className="link" href="/register">
                              Register
                            </a>
                          </h6>
                        </div>
                        <div className="pull-right">
                          <h6>
                            <a className="link" href="/forgotPassword">
                              Forgot Password?
                            </a>
                          </h6>
                        </div>
                      </CardFooter>
                    </Form>
                  </Card>
                </Col>
              </div>
            )}
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
