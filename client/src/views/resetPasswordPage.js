import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import * as legoData from "../pops.json";
import Message from "components/Message";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function ResetPasswordPage(props) {
  let token = useParams({}).token;
  let timerID = useRef(null);

  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [message, setMessage] = useState(null);
  const [alert, setAlert] = useState("");
  const [isvalid, setIsValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  useEffect(() => {
    let didCancel = false;
    setAlert("Validating Request...");
    setIsLoaded(false);
    setTimeout(() => {
      async function resetValidation() {
        !didCancel && setIsLoaded(true);
        try {
          const fetcher = await window.fetch("/auth/reset/" + token);

          const response = await fetcher
            .json()

            .then((data) => data)
            .then((data) => {
              const { message, resetPasswordToken, username } = data;
              !didCancel && setMessage(message);

              if (message.msgBody === "Please enter a new password") {
                setIsValid(true);
                setUsername(username);
                console.log(resetPasswordToken);
                console.log(username);
              }
              console.log(response);
            });
        } catch (error) {
          console.log(error);
        } finally {
          !didCancel && setIsLoaded(true);
        }
      }
      if (token) resetValidation();
      return () => {
        didCancel = true;
      };
    }, 5000);
  }, [token]);

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (
    e,
    url = "/auth/updatepassword",
    data = { password, token, username }
  ) => {
    console.log(data);
    e.preventDefault();
    try {
      const fetcher = await fetch(url, {
        method: "PUT",

        headers: { "Content-type": "application/json" },

        body: JSON.stringify(data),
      });
      const response = await fetcher
        .json()

        .then((data) => data)
        .then((data) => {
          const { message } = data;

          setMessage(message);
          if (message.msgBody === "password updated") {
            timerID = setTimeout(() => {
              props.history.push("/login");
            }, 2000);
          }
          console.log(response);
        });
    } catch (error) {
      setMessage(error.Message);
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
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
                <h2 style={{ marginTop: "100px" }}>Reset Password</h2>
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
                              (passwordFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              variant="outlined"
                              required
                              placeholder="Enter Password..."
                              type="password"
                              id="password"
                              name="password"
                              onChange={onChange}
                              onFocus={() => setPasswordFocus(true)}
                              onBlur={() => setPasswordFocus(false)}
                            ></Input>
                          </InputGroup>
                        ) : (
                          ""
                        )}{" "}
                      </CardBody>
                      <CardFooter className="text-center">
                        {!isvalid === false ? (
                          <Button
                            block
                            className="btn-round"
                            color="warning"
                            type="submit"
                            style={{ color: "green" }}
                            size="lg"
                          >
                            Reset Password
                          </Button>
                        ) : (
                          ""
                        )}

                        <div className="pull-left">
                          <h6>
                            <a className="link" href="/login">
                              Login
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
            )}{" "}
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default ResetPasswordPage;
