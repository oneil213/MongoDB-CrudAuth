import React, { useState, useRef, useEffect } from "react";
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

function RegisterPage(props) {
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(undefined);
  const [alert] = useState("Creating Account...");
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });
  let timerID = useRef(null);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
    });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      timerID = setTimeout(() => {
        setIsLoaded(true);
        if (!message.msgError) {
          timerID = setTimeout(() => {
            props.history.push("/login");
          }, 2000);
        }
      }, 5000);
    });
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
                <h2 style={{ marginTop: "100px" }}>Register Here</h2>
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
                            (firstnameFocus ? " input-group-focus" : "")
                          }
                        >
                          <Input
                            placeholder="First Name..."
                            value={user.firstname}
                            onChange={onChange}
                            required
                            id="firstname"
                            label="FirstName"
                            name="firstname"
                            type="text"
                            onFocus={() => setFirstnameFocus(true)}
                            onBlur={() => setFirstnameFocus(false)}
                          ></Input>
                        </InputGroup>
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (lastnameFocus ? " input-group-focus" : "")
                          }
                        >
                          <Input
                            placeholder="Last Name..."
                            value={user.lastname}
                            onChange={onChange}
                            required
                            id="lastname"
                            label="LastName"
                            name="lastname"
                            type="text"
                            onFocus={() => setLastnameFocus(true)}
                            onBlur={() => setLastnameFocus(false)}
                          ></Input>
                        </InputGroup>
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (usernameFocus ? " input-group-focus" : "")
                          }
                        >
                          <Input
                            placeholder="User Name..."
                            value={user.username}
                            onChange={onChange}
                            required
                            id="username"
                            label="UserName"
                            name="username"
                            type="text"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                          ></Input>
                        </InputGroup>
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (emailFocus ? " input-group-focus" : "")
                          }
                        >
                          <Input
                            placeholder="Email..."
                            variant="outlined"
                            required
                            value={user.email}
                            onChange={onChange}
                            id="email"
                            name="email"
                            type="text"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                          ></Input>
                        </InputGroup>
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (passwordFocus ? " input-group-focus" : "")
                          }
                        >
                          <Input
                            placeholder="Set Password"
                            variant="outlined"
                            required
                            value={user.password}
                            onChange={onChange}
                            name="password"
                            type="password"
                            id="password"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
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
                          Register
                        </Button>
                        {message ? <Message message={message} /> : null}
                        <div className="pull-left">
                          <h6>
                            <a className="link" href="/login">
                              Login
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
            )}
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default RegisterPage;
